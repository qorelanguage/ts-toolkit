import { EQoreAppActionCode, IQoreAppShared, IQoreRestConnectionConfig } from './apps';
import {
  TCustomConnOptions,
  TQoreAppActionOption,
  TQoreAppActionOverrideOption,
  TQoreGetDynamicTypeFunction,
  TQoreMappedOptions,
  TQoreOptions,
  TQoreOptionsNotLocalized,
} from './options';
import { TQoreTypeObject } from './types';

export interface IQoreBaseAppAction<CustomConnOptions extends TCustomConnOptions = TCustomConnOptions>
  extends IQoreAppShared {
  app: string;
  action: string;
  action_code: EQoreAppActionCode;
  override_options?: Record<string, TQoreAppActionOverrideOption<CustomConnOptions>>;
  ignore_options?: string[];
  response_type?: TQoreResponseType;
  groups?: string[];
  request_type?: TQoreOptionsNotLocalized;
}

export type TQoreGetDynamicRequestTypeFunction = (
  context?: TQoreAppActionFunctionContext,
) => TQoreOptionsNotLocalized | Promise<TQoreOptionsNotLocalized>;

export type TQoreGetDynamicResponseTypeFunction<CustomConnOptions extends TCustomConnOptions = TCustomConnOptions> = (
  context?: TQoreAppActionFunctionContext<CustomConnOptions>,
) => TQoreResponseType | Promise<TQoreResponseType>;

export type TQoreAppActionFunctionContext<
  CustomConnOptions extends TCustomConnOptions = TCustomConnOptions,
  Options extends TQoreOptions = TQoreOptions,
> = {
  conn_name?: string;
  conn_opts?: Partial<IQoreRestConnectionConfig> & TQoreMappedOptions<CustomConnOptions>;
  opts?: TQoreMappedOptions<Options>;
};

export type TQoreAppActionFunction<Options extends TQoreOptions = TQoreOptions> = (
  obj?: Partial<TQoreMappedOptions<Options>>,
  options?: never,
  context?: TQoreAppActionFunctionContext<TCustomConnOptions, Options>,
) => any;

export type TWebhookHttpMethod = 'POST' | 'PUT' | 'PATCH' | 'GET';

export interface IQoreAppActionWithEventOrWebhook<Options extends TQoreOptions = TQoreOptions>
  extends IQoreBaseAppAction {
  action_code: EQoreAppActionCode.EVENT;
  event_info: TQoreAppActionWithEventOrWebhookEventInfo;
  options?: Options;
  get_dynamic_type?: TQoreGetDynamicTypeFunction<TCustomConnOptions>;
  // Triggers use get_dynamic_type instead
  get_example_event_data?: (
    context: TQoreAppActionFunctionContext<TCustomConnOptions, Options>,
  ) => Record<string, any> | Promise<Record<string, any>>;
}

export type TQoreAppActionWithEventOrWebhookEventInfo = {
  id?: string;
  desc: string;
  type: TQoreTypeObject;
};

export interface IQoreAppActionWithWebhookBase<
  CustomConnOptions extends TCustomConnOptions = TCustomConnOptions,
  Options extends TQoreOptions = TQoreOptions,
> extends IQoreAppActionWithEventOrWebhook<Options> {
  webhook_method: TWebhookHttpMethod;
  webhook_auth?: EQoreAppActionWebhookAuthType;
  webhook_register: TWebhookRegisterFunction<CustomConnOptions, Options>;
  webhook_deregister: TWebhookDeregisterFunction<CustomConnOptions>;
  // webhook event location in dot notation (ex: 'data.account.events')
  webhook_event_loc?: string;
  webhook_echo_header?: string;
  webhook_echo_body_keys?: string[];

  // an optional location of a confirmation key in each webhook message in dot
  webhook_confirmation_key_loc?: string;

  // an optional value to compare with the value at \a webhook_confirmation_key_loc to determine if the message is a confirmation message
  webhook_confirmation_value?: string;

  // an optional location of a confirmation URL in confirmation messages in dot notation
  webhook_confirmation_url_loc?: string;

  // an optional HTTP method to use when calling the confirmation URL in confirmation messages; defaults to "GET"
  webhook_confirmation_method?: TWebhookHttpMethod;

  // an optional Content-Type value to treat as JSON when receiving webhook messages
  webhook_assume_json?: string;

  /**
   * Optional function to transform or filter webhook event data.
   * Called after webhook_event_loc extraction but before passing to workflow.
   * Return null/undefined to skip the event entirely.
   */
  format_event_data?: TWebhookFormatEventDataFunction<CustomConnOptions, Options>;
}

export type TWebhookRegisterFunction<
  CustomConnOptions extends TCustomConnOptions = TCustomConnOptions,
  Options extends TQoreOptions = TQoreOptions,
> = (
  context: TQoreAppActionFunctionContext<CustomConnOptions, Options>,
  url: string,
) => Promise<Record<string, any> | void>;

export type TWebhookDeregisterFunction<CustomConnOptions extends TCustomConnOptions = TCustomConnOptions> = (
  context: TQoreAppActionFunctionContext<CustomConnOptions>,
  url: string,
  regInfo: Record<string, any>,
) => Promise<void>;

/**
 * Function type for format_event_data webhook transformation.
 * Called after webhook_event_loc extraction but before passing to workflow.
 * @param context - App context with connection and trigger options
 * @param eventData - The webhook event data (after webhook_event_loc extraction)
 * @returns Transformed event data, or null/undefined to skip the event entirely
 */
export type TWebhookFormatEventDataFunction<
  CustomConnOptions extends TCustomConnOptions = TCustomConnOptions,
  Options extends TQoreOptions = TQoreOptions,
> = (
  context: TQoreAppActionFunctionContext<CustomConnOptions, Options>,
  eventData: Record<string, any>,
) => Promise<Record<string, any> | null | undefined> | Record<string, any> | null | undefined;

export interface IQoreAppActionWithWebhookWithoutPerms<Options extends TQoreOptions = TQoreOptions>
  extends IQoreAppActionWithWebhookBase<TCustomConnOptions, Options> {
  webhook_auth?: EQoreAppActionWebhookAuthType.AUTH_NONE;
  webhook_perms?: never;
}

export interface IQoreAppActionWithWebhookWithPerms<Options extends TQoreOptions = TQoreOptions>
  extends IQoreAppActionWithWebhookBase<TCustomConnOptions, Options> {
  webhook_auth?: EQoreAppActionWebhookAuthType.AUTH_REQUIRE_AUTH;
  webhook_perms?: string[];
}

export type TQoreAppActionWithWebhook<Options extends TQoreOptions = TQoreOptions> =
  | IQoreAppActionWithWebhookWithoutPerms<Options>
  | IQoreAppActionWithWebhookWithPerms<Options>;

export interface IQoreAppActionWithEvent<Options extends TQoreOptions = TQoreOptions>
  extends IQoreAppActionWithEventOrWebhook<Options> {
  event_function: (
    context: TQoreAppActionFunctionContext<TCustomConnOptions, Options>,
    update: (event_data: Record<string, any>) => void,
    should_stop: () => boolean,
  ) => void;
}

export type TQoreResponseType = string | TQoreTypeObject;

export enum EQoreAppActionWebhookAuthType {
  AUTH_NONE = 0,
  AUTH_REQUIRE_AUTH = 1,
}

export type TQoreRequestDataConverterFunction<
  CustomConnOptions extends TCustomConnOptions = TCustomConnOptions,
  Options extends TQoreOptions = TQoreOptions,
> = (
  request: Partial<TQoreMappedOptions<Options>>,
  ctx: TQoreAppActionFunctionContext<CustomConnOptions, Options>,
) => Record<string, any>;

export type TQoreResponseDataConverterFunction<
  CustomConnOptions extends TCustomConnOptions = TCustomConnOptions,
  Options extends TQoreOptions = TQoreOptions,
> = (
  response: { body?: Record<string, any>; headers?: Record<string, any>; 'headers-raw'?: Record<string, any> },
  ctx: TQoreAppActionFunctionContext<CustomConnOptions, Options>,
) => any;

export interface IQoreAppActionWithFunction<Options extends TQoreOptions = TQoreOptions, _Response = TQoreResponseType>
  extends IQoreBaseAppAction {
  action_code: EQoreAppActionCode.ACTION;
  api_function: TQoreAppActionFunction<Options>;
  get_dynamic_response_type?: TQoreGetDynamicResponseTypeFunction;
  options?: Options;
  io_timeout_secs?: number;
}

export interface IQoreAppActionWithSwaggerPath<Options extends TQoreOptions = TQoreOptions> extends IQoreBaseAppAction {
  action_code: EQoreAppActionCode.ACTION;
  swagger_path: string;
  swagger_schema?: string;
  // optional list of vars in swagger_path (ex: '/{id}/{key}') that should not have option dependencies created
  independent_path_vars?: string[];
  get_dynamic_request_type?: TQoreGetDynamicRequestTypeFunction;
  request_data_converter?: TQoreRequestDataConverterFunction<TCustomConnOptions, Options>;
  response_data_converter?: TQoreResponseDataConverterFunction<TCustomConnOptions, Options>;
}

export interface IQorePartialAppActionWithSwaggerPath extends Omit<IQoreBaseAppAction, 'app'> {
  swagger_path: string;
  action_code: EQoreAppActionCode.ACTION;
  // optional list of vars in swagger_path (ex: '/{id}/{key}') that should not have option dependencies created
  independent_path_vars?: string[];
}

export type TQoreAppNonEventAction<Options extends TQoreOptions = TQoreOptions, Response = TQoreResponseType> =
  | IQoreAppActionWithFunction<Options, Response>
  | IQoreAppActionWithSwaggerPath;
export type TQoreAppEventAction<Options extends TQoreOptions = TQoreOptions> =
  | IQoreAppActionWithEvent<Options>
  | TQoreAppActionWithWebhook<Options>;

export type TQoreAppAction<Options extends TQoreOptions = TQoreOptions, Response = TQoreResponseType> =
  | TQoreAppNonEventAction<Options, Response>
  | TQoreAppEventAction<Options>;

export type TQorePartialNonEventAction<
  Options extends TQoreOptions = Record<string, TQoreAppActionOption>,
  Response = Record<string, TQoreTypeObject>,
> = Omit<IQoreAppActionWithFunction<Options, Response>, 'app'> | IQorePartialAppActionWithSwaggerPath;

export type TQorePartialEventAction<Options extends TQoreOptions = TQoreOptions> =
  | Omit<TQoreAppActionWithWebhook<Options>, 'app'>
  | Omit<IQoreAppActionWithEvent<Options>, 'app'>;

export type TQorePartialAction<
  Options extends TQoreOptions = Record<string, TQoreAppActionOption>,
  Response = Record<string, TQoreTypeObject>,
> = TQorePartialNonEventAction<Options, Response> | TQorePartialEventAction<Options>;
