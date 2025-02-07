import { TQoreAppAction, TQoreAppActionFunctionContext } from './actions';
import { IQoreConnectionOption, TQoreMappedOptions, TQoreOptions } from './options';

export interface IQoreAppShared {
  display_name?: string;
  short_desc?: string;
  desc?: string;
}

export interface IQoreAppSharedNotLocalized {
  display_name: string;
  short_desc: string;
  desc: string;
}

export interface IQoreSwaggerConfig {
  // A location to a Swagger 2.0 schema = OpenAPI 2.0
  swagger?: string;
  // an optional hash of swagger parsing options
  swagger_options?: {
    // this will turn on all lax parsing options - or you can use 128
    // (LM_ACCEPT_QUERY_OBJECTS = accept "object" as a valid type for query parameters like OpenAPI 3.0)
    parse_flags?: number;
  };
  // a list of swagger paths to build an optimized schema
  swagger_paths?: string[];
  /*
   an object keyed by Swagger type (in dot notation), values are
   applied to override the given types
  */
  swagger_type_overrides?: Record<string, any>;
  // if date/time values should be serialized in UTC as Swagger query args
  swagger_utc_dates?: boolean;
  // the date format to use when serializing Swagger query date args
  swagger_query_date_format?: string;
}

export interface IQoreApp<
  RestModifierOptions extends Record<string, IQoreConnectionOption> = Record<string, IQoreConnectionOption>,
> extends IQoreSwaggerConfig,
    IQoreAppShared {
  name: TStringWithFirstUpperCaseCharacter;
  logo: string;
  logo_file_name: string;
  logo_mime_type: string;
  rest?: IQoreRestConnectionConfig;
  rest_modifiers?: IQoreRestConnectionModifiers<RestModifierOptions>;
  swagger_schema_map?: Record<string, IQoreSwaggerConfig>;
}

export interface IQoreExistingApp {
  name: TStringWithFirstUpperCaseCharacter;
  module: string;
  root_provider?: string;
}

export interface IQoreExistingAppWithActions extends IQoreExistingApp {
  actions: TQoreAppAction[];
}

export interface TQoreAppWithActions<
  Actions extends TQoreAppAction<TQoreOptions>[] = TQoreAppAction<TQoreOptions>[],
  RestModifierOptions extends Record<string, IQoreConnectionOption> = Record<string, IQoreConnectionOption>,
> extends IQoreApp<RestModifierOptions> {
  actions: Actions;
}

export type TQoreApps = Record<string, TQoreAppWithActions>;
export type TQoreExistingApps = Record<string, IQoreExistingAppWithActions>;

export enum EQoreAppActionCode {
  EVENT = 1,
  ACTION = 2,
}

export const QoreAppActionCodeToLocale: {
  [key in EQoreAppActionCode]: string;
} = {
  [EQoreAppActionCode.EVENT]: 'triggers',
  [EQoreAppActionCode.ACTION]: 'actions',
};

export type TFirstAppCharacter =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9;

export type TStringWithFirstUpperCaseCharacter = `${TFirstAppCharacter}${string}`;

type TQoreRestContentEncoding = 'gzip' | 'bzip2' | 'deflate' | 'identity';

type TQoreRestData = 'auto' | 'json' | 'yaml' | 'rawxml' | 'xml' | 'url' | 'text' | 'bin';

type TQoreRestOauth2GrantType = 'authorization_code' | 'client_credentials' | 'password' | 'none';

export interface IQoreRestConnectionConfig {
  // Specifies the encoding to be used for message bodies when sending requests.
  // Possible values: "gzip", "bzip2", "deflate", "identity".
  content_encoding?: TQoreRestContentEncoding;

  // Specifies how the message body should be serialized.
  // Possible values include "auto" (default), "json", "yaml", "rawxml", "xml", "url", "text", "bin".
  data: TQoreRestData;

  // Set to true to disable automatic pings, which is useful for rate-limited, metered, or other connections
  // that should not be pinged regularly (default: false).
  disable_automatic_pings?: boolean;

  // A set of additional characters to subject to percent encoding in URLs
  encode_chars?: string;

  // An optional object containing headers to be sent with every request. Keys represent header names, and
  // values represent the corresponding header values.
  headers?: Record<string, string>;

  // Optional URL substitution info for token requests to the alternate server
  oauth2_alt_url_subst?: Record<string, any>;

  // An optional object with arguments to be serialized as query parameters in the request to the OAuth2
  // authorization URL when using the "authorization_code" grant type.
  oauth2_auth_args?: Record<string, any>;

  // The OAuth2 authorization URL used for the "authorization_code" grant type. This is ignored if a token
  // is provided directly.
  oauth2_auth_url?: string;

  // If set to true, OAuth2 tokens will be automatically refreshed when they expire (default: true).
  oauth2_auto_refresh?: boolean;

  // The OAuth2 client ID, required for certain OAuth2 flows (e.g., "authorization_code", "client_credentials").
  oauth2_client_id?: string;

  // The OAuth2 client secret, required alongside the client ID for certain OAuth2 flows.
  oauth2_client_secret?: string | 'auto';

  // The OAuth2 grant type being used. Possible values are "authorization_code", "client_credentials", "password".
  oauth2_grant_type?: TQoreRestOauth2GrantType;

  // The OAuth2 redirect URL used for the "authorization_code" grant type.
  oauth2_redirect_url?: string;

  // An OAuth2 refresh token that complements the `token` option to allow for token renewal.
  oauth2_refresh_token?: string;

  // A list of OAuth2 scopes to request during authorization. Ignored if the `token` option is set.
  oauth2_scopes?: string[];

  // Extra arguments for OAuth2 token requests, which will be serialized as query parameters.
  oauth2_token_args?: Record<string, any>;

  // Use basic authorization with the client secret only when making token requests
  oauth2_token_auth_secret_only?: boolean;

  // The OAuth2 token URL used to obtain access tokens. Ignored if the `token` option is set.
  oauth2_token_url?: string;

  // Use basic authorization with the client ID and client secret when making token requests
  oauth2_token_use_basic_auth?: boolean;

  // A separator character for OAuth2 scopes in URI arguments
  oauth2_scope_separator_char?: string;

  // The password for authentication. Not used in conjunction with OAuth2 configurations.
  password?: string;

  // The HTTP method to use for pings (e.g., "GET", "POST").
  ping_method?: string;

  // The HTTP URI path to use for pings
  ping_path?: string;

  // Headers to be sent with ping requests. Keys represent header names, and values represent the corresponding
  // header values.
  ping_headers?: Record<string, string>;

  // The message body to send with pings. The type of this body depends on the specific use case.
  ping_body?: any;

  // The proxy URL for connecting through a proxy server.
  proxy?: string;

  // An object to check all deserialized bodies in 200 OK server responses for authentication errors
  rest_body_auth_error_check?: Record<string, any>;

  // A PEM-encoded string representing an X.509 client certificate.
  ssl_cert_data?: string;

  // A PEM-encoded string representing an X.509 client key.
  ssl_key_data?: string;

  // If set to true, server certificates will only be accepted if they pass verification.
  ssl_verify_cert?: boolean;

  // A bearer token to use for the connection. This token will be passed as the `Authorization: Bearer ...` header.
  // If set, any OAuth2 options are ignored.
  token?: string;

  // The type of token to use for the `Authorization` header (e.g., "Bearer"). Ignored if no `token` is provided.
  token_type?: string;

  // The URL to connect to. This is a required field and represents the endpoint for the connection.
  url: string;

  // The username for authentication. Not used in conjunction with OAuth2 configurations.
  username?: string;

  // The base path for the Swagger API.
  swagger_base_path?: string;
}

export interface IQoreRestConnectionModifiers<
  ModifierOptions extends Record<string, IQoreConnectionOption> = Record<string, IQoreConnectionOption>,
> {
  options?: ModifierOptions;
  required_options?: string;
  url_template_options?: Array<string>;
  // code that can set additional connection option after the connection has been authorized
  set_options_post_auth?: (
    context: Omit<TQoreAppActionFunctionContext<ModifierOptions>, 'opts'>,
  ) => Promise<TQoreMappedOptions<ModifierOptions>> | TQoreMappedOptions<ModifierOptions>;
  set_options_post_auth_code?: (
    context: Omit<TQoreAppActionFunctionContext<ModifierOptions>, 'opts'>,
  ) => TQoreMappedOptions<ModifierOptions>;
  /** allows the REST URL to be changed when an option value is changed
   */
  connection_update_option?: {
    // the option name that the connection update depends on
    option: string;

    // the code called to return new URL
    code: (context: TQoreAppActionFunctionContext<ModifierOptions>) => string | void;
  };
  /** maps connection options (normally required options) that map to Swagger path options; the key is the request
      option name, the value is the action option name; the value of the connection option will be used as the value
      of the given action option in each call where the option is present
  */
  conn_option_map?: Record<keyof ModifierOptions, string>;
}
