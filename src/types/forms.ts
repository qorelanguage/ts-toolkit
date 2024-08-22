import type { TReqoreIntent } from '@qoretechnologies/reqore/dist/constants/theme';
import type { IReqoreAutoFocusRules } from '@qoretechnologies/reqore/dist/hooks/useAutoFocus';
import { IQorusExpression } from './expressions';
import { TQorusType } from './qorus';

export type TQorusFormOperatorValue = string | string[] | undefined | null;

export interface IQorusFormField {
  type: TQorusType;
  value: any;
  is_expression?: boolean;
  op?: TQorusFormOperatorValue;
}

export type TQorusForm =
  | {
      [optionName: string]: IQorusFormField | undefined;
    }
  | undefined;

export type TQorusFlatForm = Record<string, any>;

export interface IQorusFormFieldMessage {
  title?: string;
  content: string;
  intent?: TReqoreIntent;
}

export interface IQorusAllowedValue {
  display_name: string;
  short_desc: string;
  desc: string;
  value: unknown;
}

export interface IQorusFormFieldSchema {
  type: TQorusType | TQorusType[];
  element_type?: TQorusType;
  value?: unknown | IQorusExpression;
  desc?: string;
  default_value?: unknown;
  default_value_desc?: string;

  required?: boolean;
  preselected?: boolean;
  sensitive?: boolean;

  allowed_values?: IQorusAllowedValue[];
  allowed_schemes?: IQorusAllowedValue[];
  arg_schema?: IQorusFormSchema;

  supports_templates?: boolean;
  supports_references?: boolean;
  supports_styling?: boolean;
  supports_expressions?: boolean;

  app?: string;
  action?: string;

  depends_on?: string[];
  has_dependents?: boolean;
  on_change?: string[];

  display_name?: string;
  short_desc?: string;
  sort?: number;

  disabled?: boolean;
  readonly?: boolean;

  intent?: TReqoreIntent;
  metadata?: Record<string, any>;
  rules?: ['valid_identifier'];

  messages?: IQorusFormFieldMessage[];
  focusRules?: IReqoreAutoFocusRules;
  markdown?: boolean;

  get_message?: {
    action: string;
    object_type?: string;
    return_value?: string;
    message_data?: any;
    useWebSocket?: boolean;
  };

  return_message?: {
    action?: string;
    object_type?: string;
    return_value?: string;
    useWebSocket?: boolean;
  };
}

export interface IQorusFormSchema {
  [optionName: string]: IQorusFormFieldSchema;
}

export interface IQorusFormOperator {
  type?: TQorusType;
  name: string;
  desc: string;
  supports_nesting?: boolean;
  selected?: boolean;
}

export interface IQorusFormOperatorsSchema {
  [operatorName: string]: IQorusFormOperator;
}

export interface IQorusFormFieldOnChangeMeta {
  events?: string[];
}
