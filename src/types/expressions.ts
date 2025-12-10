import { TQorusType } from './qorus';

export type TQorusExpressionSchemaArg = {
  signature_type_code: string;
  name: string;
  ui_type: TQorusType;
  display_name: string;
  short_desc: string;
  desc?: string;
  sensitive: boolean;
  label_after?: string;
  label_before?: string;
  default_value?: any;
  required: boolean;
};

export interface IQorusExpressionSchema {
  desc: string;
  short_desc: string;
  display_name: string;
  name: string;
  return_type: TQorusType;
  ui_return_type: TQorusType;
  role: number;
  type: number;
  varargs: boolean;
  subtype: 1 | 2;
  args: TQorusExpressionSchemaArg[];
  symbol: string;
  from_server?: boolean;
  from_both?: boolean;
  min_args?: number;
  render_template?: string;
  return_type_first_arg?: boolean;
  return_type_arg_priority?: string[];
  groups?: string[];
}

export interface IQorusExpressionValue {
  exp?: string;
  args?: IQorusExpression[];
}

export interface IQorusExpression {
  value?: IQorusExpressionValue | any;
  type?: TQorusType;
  is_expression?: boolean;
  required?: boolean;
}
