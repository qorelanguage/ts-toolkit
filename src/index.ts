export * as Authenticator from './QorusAuthenticator';
export * as DataProvider from './QorusDataProvider';
export * as QorusOptions from './QorusOptions';
export * as HttpRequest from './QorusRequest';
export * as Validator from './QorusValidator';

export { default as QorusAuthenticator } from './QorusAuthenticator';
export { default as QorusDataProvider } from './QorusDataProvider';
export { default as QorusRequest } from './QorusRequest';
export { default as QorusValidator } from './QorusValidator';

export { TContext } from './QorusDataProvider';
export { IDefaultHeaders } from './QorusRequest';
export { IApiPaths, IAuthenticatorApiPaths, IDataProviderApiPaths, IJobsApiPaths, TVersion } from './utils/apiPaths';

export * from './types/expressions';
export * from './types/forms';
export * from './types/qore';
export * from './types/qorus';
export * from './types/utils';

/**
 * A record of objects with string key and string value
 */
export type TObjectWithStringKey = Record<string, string>;

/**
 * A record of objects with string key and any kind of value
 */
export type TObjectWithAnyValue = Record<string, any>;
