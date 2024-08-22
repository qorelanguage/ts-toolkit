import { TQorusType } from './qorus';

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
