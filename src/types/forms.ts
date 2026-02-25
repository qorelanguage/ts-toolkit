import { IReqoreCollectionItemProps } from '@qoretechnologies/reqore/dist/components/Collection/item';
import { IReqorePanelProps } from '@qoretechnologies/reqore/dist/components/Panel';
import { TReqoreIntent } from '@qoretechnologies/reqore/dist/constants/theme';
import { IReqoreAutoFocusRules } from '@qoretechnologies/reqore/dist/hooks/useAutoFocus';
import { IReqoreIconName } from '@qoretechnologies/reqore/dist/types/icons';
import { IReqraftFileFormFieldProps } from '@qoretechnologies/reqraft/dist/components/form/fields/file/File';
import { IQorusExpression, IQorusExpressionSchema } from './expressions';
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

export interface IQorusAllowedValue<IMetadata extends Record<string, any> = Record<string, any>> {
  display_name: string;
  short_desc?: string;
  desc?: string;
  name?: string;
  value: {
    type: TQorusType;
    value?: unknown;
    is_expression?: boolean;
  };
  ui_type?: TQorusType;
  type?: TQorusType;
  disabled?: boolean;
  intent?: TReqoreIntent;
  badge?: IReqorePanelProps['badge'];
  messages?: IQorusFormFieldMessage[];
  actions?: IReqorePanelProps['actions'];
  icon?: IReqoreIconName;
  image?: string;
  metadata?: IMetadata;
}

export type TQorusFormFieldOnChangeEvents = 'refetch';

export type IQorusTypeOptionsMapper = {
  file: IReqraftFileFormFieldProps['options'];
};

export interface IQorusFormFieldSchemaBase {
  element_type?: TQorusType;
  ui_element_type?: string;

  value?: unknown | IQorusExpression;
  desc?: string;

  default_value?: {
    type: TQorusType;
    value?: unknown;
    is_expression?: boolean;
  };
  default_value_desc?: string;
  default_value_display_name?: string;

  required?: boolean;
  required_groups?: string[];
  preselected?: boolean;
  sensitive?: boolean;

  allowed_values?: IQorusAllowedValue[];
  allowed_values_creatable?: boolean;

  // When type is 'list' each element in the list can have allowed values
  element_allowed_values?: IQorusAllowedValue[];
  element_allowed_values_creatable?: boolean;

  allowed_schemes?: IQorusAllowedValue[];
  arg_schema?: IQorusFormSchema;
  multiselect?: boolean;

  supports_custom_values?: boolean;
  supports_templates?: boolean;
  supports_references?: boolean;
  supports_styling?: boolean;
  supports_expressions?: boolean;

  default_view?: 'template' | 'expression';

  // URL to fetch expressions and operators for this field
  expressions?: IQorusExpressionSchema[];
  expressions_url?: string;
  server_expression_handling?: boolean;

  app?: string;
  action?: string;

  depends_on?: string[] | string[][];
  has_dependents?: boolean;
  on_change?: TQorusFormFieldOnChangeEvents[];

  display_name?: string;
  short_desc?: string;
  sort?: number;

  disabled?: boolean;
  readonly?: boolean;

  intent?: TReqoreIntent;
  metadata?: Record<string, any>;
  rules?: ['valid_identifier'];
  tags?: IReqoreCollectionItemProps['tags'];

  options?: {
    file?: IReqraftFileFormFieldProps['options'];
  };

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

export type TQorusFormFieldSchema =
  | ({
      type: keyof IQorusTypeOptionsMapper;
      ui_type: keyof IQorusTypeOptionsMapper;
      type_options?: IQorusTypeOptionsMapper[keyof IQorusTypeOptionsMapper];
    } & IQorusFormFieldSchemaBase)
  | ({
      type: Exclude<TQorusType, keyof IQorusTypeOptionsMapper>;
      ui_type: Exclude<TQorusType, keyof IQorusTypeOptionsMapper>;
    } & IQorusFormFieldSchemaBase);

export interface IQorusFormSchema {
  [optionName: string]: TQorusFormFieldSchema;
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
