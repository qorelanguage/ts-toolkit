import qs from 'qs';
import ErrorInternal from './managers/error/ErrorInternal';
import ErrorQorusRequest, { IErrorQorusRequestParams } from './managers/error/ErrorQorusRequest';
import QorusAuthenticator, { IEndpoint } from './QorusAuthenticator';
import { isValidStringArray } from './utils';

export type TQorusRequestHeader = Record<string, TQorusRecordOptions>;

export type TQorusRecordOptions = string | number | boolean;

export interface IQorusRequestResponse<T = any> {
  /** Response data from an api call */
  data: T;

  /** Response Headers */
  headers: TQorusRequestHeader;
}

export type TQorusRequestBodyType = 'json' | 'form-urlencoded';

export interface IQorusRequestParams {
  /**
   * Headers to include in an https request to Qorus server api
   */
  headers?: TQorusRequestHeader;

  /**
   * Path for a https request to Qorus server
   */
  path: string;

  /**
   * Data to include in an https request to Qorus server api
   */
  data?: any;

  /**
   * URL Parameters to include in an https request to Qorus server api.
   * Supports strings, numbers, booleans, arrays, and nested objects.
   * Values are serialized using qs library.
   */
  params?: Record<string, unknown>;

  /**
   * Body encoding type for the request
   * - 'json': (default) sends data as JSON with Content-Type: application/json
   * - 'form-urlencoded': sends data as URL-encoded form with Content-Type: application/x-www-form-urlencoded
   */
  bodyType?: TQorusRequestBodyType;
}

export interface IDefaultHeaders {
  /**
   * Content type for the Qorus request
   */
  'Content-Type': string;

  /**
   * Accepted data format type by Qorus server
   */
  Accept: string;

  /**
   * Any record with type string
   */
  [x: string]: string;
}

/**
 * QorusRequest class is wrapper for https request to Qorus server apis
 * - Adds default headers to the https request
 * - Allows creation of request parameters from a js object
 * - Allows custom headers and data object
 * @returns QorusRequest class object
 * @Category QorusRequest
 */
export class QorusRequest {
  /**
   * Default headers for the QorusRequest
   */
  defaultHeaders: IDefaultHeaders = { 'Content-Type': 'application/json', Accept: 'application/json' };

  /**
   * Helper method to properly concatenate URL and path
   * Ensures exactly one slash between URL and path
   */
  private buildFetchUrl = (baseUrl: string, path: string, params?: string): string => {
    // Remove trailing slash from base URL and leading slash from path
    const cleanUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    const fullUrl = `${cleanUrl}${cleanPath}`;
    return params ? `${fullUrl}?${params}` : fullUrl;
  };

  /**
   * Helper method to parse error response with fallback
   * Tries to parse as JSON first, then as text, then provides a structured fallback
   */
  private parseErrorResponse = async (response: Response): Promise<string | IErrorQorusRequestParams> => {
    try {
      // First try to get the response text
      const text = await response.text();

      // If we got text, try to parse it as JSON
      if (text) {
        try {
          return JSON.parse(text);
        } catch {
          // If it's not JSON, return as string
          return text;
        }
      }

      // If no text, return structured error object with HTTP status info
      const statusInfo = response.status ? ` (${response.status} ${response.statusText})` : '';
      return {
        status: response.status || 0,
        err: response.statusText || 'Unknown Error',
        desc: `QorusRequest error: Server returned empty response${statusInfo}`,
      };
    } catch (error) {
      // If even getting text fails, return a fallback error object with HTTP status info
      const statusInfo = response.status ? ` (${response.status} ${response.statusText})` : '';
      return {
        status: response.status || 0,
        err: response.statusText || 'Unknown Error',
        desc: `QorusRequest error: Failed to read server response${statusInfo}`,
      };
    }
  };

  private makeRequest = async (
    type: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH',
    props: IQorusRequestParams,
    endpoint?: IEndpoint,
  ): Promise<IQorusRequestResponse> => {
    const { path, data, headers: customHeaders, params, bodyType = 'json' } = props;
    let selectedEndpoint: IEndpoint | undefined;

    if (isValidStringArray([endpoint?.url, endpoint?.endpointId])) {
      selectedEndpoint = endpoint;
    } else {
      selectedEndpoint = QorusAuthenticator.getSelectedEndpoint();
    }

    // Merge default headers with custom headers (custom headers override defaults)
    const headers: TQorusRequestHeader = { ...this.defaultHeaders, ...customHeaders };

    // Override Content-Type for form-urlencoded requests
    if (bodyType === 'form-urlencoded') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    if (selectedEndpoint?.url) {
      if (selectedEndpoint?.authToken) {
        headers['Qorus-Token'] = selectedEndpoint.authToken;
      }

      // Serialize params using qs (supports arrays, nested objects, etc.)
      const requestParams = params ? qs.stringify(params, { skipNulls: true }) : '';
      const fetchUrl = this.buildFetchUrl(selectedEndpoint.url, path, requestParams);

      // Serialize body based on bodyType
      let body: string | undefined;
      if (data) {
        if (bodyType === 'form-urlencoded') {
          body = qs.stringify(data, { skipNulls: true });
        } else {
          body = JSON.stringify(data);
        }
      }

      const fetchConfig: RequestInit = {
        method: type,
        headers: headers as HeadersInit,
        body,
      };

      let response: Response;
      try {
        response = await fetch(fetchUrl, fetchConfig);
      } catch (error) {
        // Handle network errors (connection refused, timeout, etc.)
        throw new ErrorQorusRequest({
          status: 0,
          err: 'Network Error',
          desc: error instanceof Error ? error.message : 'QorusRequest error: Failed to connect to server',
        });
      }

      if (!response.ok) {
        const errorData = await this.parseErrorResponse(response);

        throw new ErrorQorusRequest(errorData);
      }

      // Convert response headers to a plain object
      const responseHeaders: TQorusRequestHeader = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      if (response.status === 204) {
        return {
          data: {},
          headers: responseHeaders,
        };
      }

      let responseData: unknown;

      try {
        responseData = await response.json();
      } catch (error) {
        // If parsing fails, try to get text, or return empty object
        try {
          responseData = await response.text();
        } catch {
          responseData = {};
        }
      }

      return {
        data: responseData,
        headers: responseHeaders,
      };
    }

    throw new ErrorInternal('Initialize an endpoint using QorusAuthenticator to use QorusRequest');
  };

  /**
   * Get request creator for the QorusToolkit
   * @param props QorusRequestParams endpoint url is mandatory to make a get request
   * @returns Result of the get request
   */
  async get<T = IQorusRequestResponse>(props: IQorusRequestParams, endpoint?: IEndpoint): Promise<T> {
    return this.makeRequest('GET', props, endpoint) as Promise<T>;
  }

  /**
   * Post request creator for the QorusToolkit
   * @param props QorusRequestParams endpoint url is mandatory to make a post request
   * @returns Result of the post request
   */
  async post<T = IQorusRequestResponse>(props: IQorusRequestParams, endpoint?: IEndpoint): Promise<T> {
    return this.makeRequest('POST', props, endpoint) as Promise<T>;
  }

  /**
   * Put request creator for the QorusToolkit
   * @param props QorusRequestParams endpoint url is mandatory to make a put request
   * @returns Result of the put request
   */
  async put<T = IQorusRequestResponse>(props: IQorusRequestParams, endpoint?: IEndpoint): Promise<T> {
    return this.makeRequest('PUT', props, endpoint) as Promise<T>;
  }

  /**
   * Patch request creator for the QorusToolkit
   * @param props QorusRequestParams endpoint url is mandatory to make a patch request
   * @returns Result of the patch request
   */
  async patch<T = IQorusRequestResponse>(props: IQorusRequestParams, endpoint?: IEndpoint): Promise<T> {
    return this.makeRequest('PATCH', props, endpoint) as Promise<T>;
  }

  /**
   * Delete request creator for the QorusToolkit
   * @param props QorusRequestParams endpoint url is mandatory to make a delete request
   * @returns Result of the delete request
   */
  async deleteReq<T = IQorusRequestResponse>(props: IQorusRequestParams, endpoint?: IEndpoint): Promise<T> {
    return this.makeRequest('DELETE', props, endpoint) as Promise<T>;
  }
}

export default new QorusRequest();
