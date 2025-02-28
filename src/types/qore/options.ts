import { IReqoreIconName } from '@qoretechnologies/reqore/dist/types/icons';
import { TQoreAppActionFunctionContext, TWebhookHttpMethod } from './actions';
import { IQoreAppShared, IQoreAppSharedNotLocalized } from './apps';
import {
  IQoreTypeObjectList,
  IQoreTypeObjectNonList,
  TQoreAnyType,
  TQoreBooleanCompatibleType,
  TQoreHashCompatibleType,
  TQoreListCompatibleType,
  TQoreNullableType,
  TQoreNumberCompatibleType,
  TQoreStringCompatibleType,
  TQoreType,
  TQoreTypeMapping,
} from './types';

export type TCustomConnOptions = Record<string, IQoreConnectionOption>;
export type TCustomFields<CustomConnOptions extends TCustomConnOptions = TCustomConnOptions> = Record<
  string,
  TQoreAppActionOption<CustomConnOptions>
>;
export type TQoreOptionOnChangeEvents = 'refetch';
export type TRestGetAllowedValuesMethod = TWebhookHttpMethod;

export interface IQoreConnectionOption
  extends Omit<
    TQoreAppActionOption,
    'get_allowed_values' | 'get_dependent_options' | 'rest_get_allowed_values' | 'required'
  > {
  freeform?: boolean;
  sensitive?: boolean;
  subset_env_vars?: boolean;
}

export type TQoreGetAllowedValuesFunction<
  CustomConnOptions extends TCustomConnOptions = TCustomConnOptions,
  TypeValue = unknown,
> = (
  context?: TQoreAppActionFunctionContext<CustomConnOptions>,
) => IQoreAllowedValue<TypeValue>[] | Promise<IQoreAllowedValue<TypeValue>[]>;

export type TQoreGetDefaultValueFunction<
  CustomConnOptions extends TCustomConnOptions = TCustomConnOptions,
  TypeValue = unknown,
> = (context?: TQoreAppActionFunctionContext<CustomConnOptions>) => TypeValue | Promise<TypeValue>;

export type TQoreGetDynamicTypeFunction<CustomConnOptions extends TCustomConnOptions = TCustomConnOptions> = (
  context?: TQoreAppActionFunctionContext<CustomConnOptions>,
) => TQoreType | Promise<TQoreType>;

// Type to extract the type of each option using the mapping
export type TQoreOptionType<Option> = Option extends { type: keyof TQoreTypeMapping }
  ? TQoreTypeMapping[Option['type']]
  : never;

// Mapped type to map over the keys of the options object and apply the OptionType type
export type TQoreOptionsType<Options extends TQoreOptions | TCustomConnOptions = TQoreOptions> = {
  [OptionKey in keyof Options]: TQoreOptionType<Options[OptionKey]>;
};

export type TQoreMappedOptions<T extends TQoreOptions | TCustomConnOptions> = TQoreOptionsType<T>;

export interface IQoreAllowedValue<TypeValue = unknown> extends IQoreAppShared {
  value: TypeValue;
  icon?: IReqoreIconName;
  image?: string;
}

export type TQoreGetDependentOptionsFunction = (
  context?: TQoreAppActionFunctionContext,
) => Record<string, TQoreAppActionOption> | Promise<Record<string, TQoreAppActionOption>>;

export interface IQoreRestGetAllowedValues {
  // The HTTP method for the call
  method: TWebhookHttpMethod;

  // The REST request path
  path: string;

  // Any REST body
  body?: Record<string, any>;

  // Any REST headers
  headers?: Record<string, any>;

  // Location of the values in the result in dot notation (ex: 'body.envelopes.envelopeId')
  values: string;

  // Location of the display names in the result in dot notation (ex: 'body.envelopes.envelopeName')
  display_names?: string;

  // Location of descriptions in the result in dot notation (ex: 'body.envelopes.description')
  /** Descriptions are long, markdown-formatted string descriptions
   */
  descriptions?: string;

  // Location of the short descriptions in the result in dot notation (ex: 'body.envelopes.shortDesc')
  /** Short descs are short, plain-text string descriptions
   */
  short_descs?: string;
}

export interface IQoreSharedObject<TypeValue = unknown> extends IQoreAppShared {
  // whether the field is required
  required?: boolean;
  //if fields of this type should be preselected; will set the corresponding UI flag
  preselected?: boolean;
  // (values must be of the correct type) the default value if none is provided by the user
  default_value?: TypeValue;
}

export interface IQoreAppActionBaseOption<CustomConnOptions extends TCustomConnOptions> extends IQoreSharedObject {
  get_dependent_options?: TQoreGetDependentOptionsFunction;
  /** Mutually-exclusive with 'get_allowed_values'
   */
  rest_get_allowed_values?: IQoreRestGetAllowedValues;
  allowed_values_creatable?: boolean;
  depends_on?: string[] | string[][];

  attr?: Record<string, any>;
  sensitive?: boolean;
  required_groups?: string[];
  on_change?: TQoreOptionOnChangeEvents[];
  get_dynamic_type?: TQoreGetDynamicTypeFunction<CustomConnOptions>;
}

export interface IQoreAppActionStringOption<CustomConnOptions extends TCustomConnOptions>
  extends IQoreAppActionBaseOption<CustomConnOptions> {
  type: TQoreStringCompatibleType;
  example_value?: string;
  allowed_values?: IQoreAllowedValue<string>[];
  default_value?: string;
  /** Mutually-exclusive with 'rest_get_allowed_values'
   */
  get_allowed_values?: TQoreGetAllowedValuesFunction<CustomConnOptions, string>;
  get_default_value?: TQoreGetDefaultValueFunction<CustomConnOptions, string>;
}

export interface IQoreAppActionBooleanOption<CustomConnOptions extends TCustomConnOptions>
  extends IQoreAppActionBaseOption<CustomConnOptions> {
  type: TQoreBooleanCompatibleType;
  example_value?: boolean;
  allowed_values?: IQoreAllowedValue<boolean>[];
  default_value?: boolean;
  /** Mutually-exclusive with 'rest_get_allowed_values'
   */
  get_allowed_values?: TQoreGetAllowedValuesFunction<CustomConnOptions, boolean>;
  get_default_value?: TQoreGetDefaultValueFunction<CustomConnOptions, boolean>;
}

export interface IQoreAppActionListOption<CustomConnOptions extends TCustomConnOptions>
  extends IQoreAppActionBaseOption<CustomConnOptions> {
  type: TQoreListCompatibleType | IQoreTypeObjectList;
  example_value?: unknown[];
  allowed_values?: IQoreAllowedValue<unknown>[];
  default_value?: unknown[];
  /** Mutually-exclusive with 'rest_get_allowed_values'
   */
  get_allowed_values?: TQoreGetAllowedValuesFunction<CustomConnOptions, unknown>;
  get_default_value?: TQoreGetDefaultValueFunction<CustomConnOptions, unknown[]>;
}

export interface IQoreAppActionObjectOption<CustomConnOptions extends TCustomConnOptions>
  extends IQoreAppActionBaseOption<CustomConnOptions> {
  type: TQoreHashCompatibleType | IQoreTypeObjectNonList;
  example_value?: Record<string, unknown>;
  allowed_values?: IQoreAllowedValue<Record<string, unknown>>[];
  default_value?: Record<string, unknown>;
  /** Mutually-exclusive with 'rest_get_allowed_values'
   */
  get_allowed_values?: TQoreGetAllowedValuesFunction<CustomConnOptions, Record<string, unknown>>;
  get_default_value?: TQoreGetDefaultValueFunction<CustomConnOptions, Record<string, unknown>>;
}

export interface IQoreAppActionNumberOption<CustomConnOptions extends TCustomConnOptions>
  extends IQoreAppActionBaseOption<CustomConnOptions> {
  type: TQoreNumberCompatibleType;
  example_value?: number;
  allowed_values?: IQoreAllowedValue<number>[];
  default_value?: number;
  /** Mutually-exclusive with 'rest_get_allowed_values'
   */
  get_allowed_values?: TQoreGetAllowedValuesFunction<CustomConnOptions, number>;
  get_default_value?: TQoreGetDefaultValueFunction<CustomConnOptions, number>;
}

export interface IQoreAppActionNullOption<CustomConnOptions extends TCustomConnOptions>
  extends IQoreAppActionBaseOption<CustomConnOptions> {
  type: TQoreNullableType;
  example_value?: never;
  allowed_values?: IQoreAllowedValue<never>[];
  default_value?: never;
  /** Mutually-exclusive with 'rest_get_allowed_values'
   */
  get_allowed_values?: TQoreGetAllowedValuesFunction<CustomConnOptions, never>;
  get_default_value?: TQoreGetDefaultValueFunction<CustomConnOptions, never>;
}

export interface IQoreAppActionAnyOption<CustomConnOptions extends TCustomConnOptions>
  extends IQoreAppActionBaseOption<CustomConnOptions> {
  type: TQoreAnyType;
  example_value?: any;
  allowed_values?: IQoreAllowedValue<any>[];
  default_value?: any;
  /** Mutually-exclusive with 'rest_get_allowed_values'
   */
  get_allowed_values?: TQoreGetAllowedValuesFunction<CustomConnOptions, any>;
  get_default_value?: TQoreGetDefaultValueFunction<CustomConnOptions, any>;
}

export type TQoreAppActionOption<CustomConnOptions extends TCustomConnOptions = TCustomConnOptions> =
  | IQoreAppActionStringOption<CustomConnOptions>
  | IQoreAppActionNumberOption<CustomConnOptions>
  | IQoreAppActionBooleanOption<CustomConnOptions>
  | IQoreAppActionListOption<CustomConnOptions>
  | IQoreAppActionObjectOption<CustomConnOptions>
  | IQoreAppActionNullOption<CustomConnOptions>
  | IQoreAppActionAnyOption<CustomConnOptions>;

export type TQoreAppActionOverrideOption<CustomConnOptions extends TCustomConnOptions = TCustomConnOptions> = Partial<
  TQoreAppActionOption<CustomConnOptions>
>;

export type TQoreOptions = Record<string, TQoreAppActionOption>;
export type TQoreOptionsNotLocalized = Record<string, TQoreAppActionOption & IQoreAppSharedNotLocalized>;
