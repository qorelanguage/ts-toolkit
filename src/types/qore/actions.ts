import { EQoreAppActionCode, IQoreAppShared, IQoreRestConnectionConfig } from './apps';
import {
  TCustomConnOptions,
  TQoreAppActionOption,
  TQoreAppActionOverrideOption,
  TQoreMappedOptions,
  TQoreOptions,
} from './options';
import { TQoreTypeObject } from './types';

export interface IQoreBaseAppAction<CustomConnOptions extends TCustomConnOptions = TCustomConnOptions>
  extends IQoreAppShared {
  app: string;
  action: string;
  action_code: EQoreAppActionCode;
  override_options?: Record<string, TQoreAppActionOverrideOption<CustomConnOptions>>;
  get_dynamic_request_type?: TQoreGetDynamicRequestTypeFunction;
}

export type TQoreGetDynamicRequestTypeFunction = (
  context?: TQoreAppActionFunctionContext,
) => Record<string, TQoreAppActionOption> | Promise<Record<string, TQoreAppActionOption>>;

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

export interface IQoreAppActionWithFunction<Options extends TQoreOptions = TQoreOptions, _Response = TQoreResponseType>
  extends IQoreBaseAppAction {
  action_code: EQoreAppActionCode.ACTION;
  api_function: TQoreAppActionFunction<Options>;
  options?: Options;
  response_type?: TQoreResponseType;
  io_timeout_secs?: number;
}

export interface IQoreAppActionWithSwaggerPath extends IQoreBaseAppAction {
  action_code: EQoreAppActionCode.ACTION;
  swagger_path: string;
  swagger_schema?: string;
  // optional list of vars in swagger_path (ex: '/{id}/{key}') that should not have option dependencies created
  independent_path_vars?: string[];
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
