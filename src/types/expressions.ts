import { TQorusFormFieldSchema } from './forms';
import { TQorusType } from './qorus';

export type TQorusExpressionSchemaArg = Omit<TQorusFormFieldSchema, 'type'> & {
  label_before?: string;
  label_after?: string;
  type: {
    base_type: TQorusType;
    name: string;
    types_accepted: TQorusType[];
  };
};

export interface IQorusExpressionSchema {
  desc: string;
  short_desc: string;
  display_name: string;
  name: string;
  return_type: TQorusType;
  role: number;
  type: number;
  varargs: boolean;
  subtype: 1 | 2;
  args: TQorusExpressionSchemaArg[];
  symbol: string;
  from_server?: boolean;
  from_both?: boolean;
  min_args?: number;
  return_type_first_arg?: boolean;
  return_type_arg_priority?: string[];
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
