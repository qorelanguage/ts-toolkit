export interface IQoreAppShared {
  display_name: string;
  short_desc: string;
  desc?: string;
}
export interface IQoreApp extends IQoreAppShared {
  name: string;
  actions: (IQoreAppActionWithoutFunction | IQoreAppActionWithFunction)[];
  logo?: string;
  logo_file_name?: string;
  logo_mime_type?: string;
}

export interface IQoreAppAction extends IQoreAppShared {
  app: string;
  action: string;
  action_code: 1 | 2; // What are other possible values?
}

export type TQoreAppActionFunction = (obj?: string | Record<string, any>) => any;

export type IQoreType =
  | 'int'
  | 'integer'
  | 'string'
  | 'boolean'
  | 'bool'
  | 'double'
  | 'float'
  | 'number'
  | 'binary'
  | 'list'
  | 'hash'
  | 'object'
  | 'date'
  | 'NULL'
  | 'nothing'
  | 'base64binary'
  | 'base64urlbinary'
  | 'hexbinary'
  | 'data'
  | 'softint'
  | 'softstring'
  | 'softbool'
  | 'softfloat'
  | 'softnumber'
  | 'softdate'
  | '*softint'
  | '*softstring'
  | '*softbool'
  | '*softfloat'
  | '*softnumber'
  | '*softdate'
  | 'all'
  | 'any'
  | 'auto'
  | '*int'
  | '*integer'
  | '*string'
  | '*boolean'
  | '*bool'
  | '*double'
  | '*float'
  | '*number'
  | '*binary'
  | '*list'
  | '*hash'
  | '*object'
  | '*date'
  | '*data'
  | '*base64binary'
  | '*base64urlbinary'
  | '*hexbinary'
  | 'byte'
  | '*byte'
  | 'softbyte'
  | '*softbyte'
  | 'ubyte'
  | '*ubyte'
  | 'softubyte'
  | '*softubyte';

interface IQoreAllowedValue {
  display_name?: string; // the user-friendly display name for the field
  short_desc?: string; // a short plain-text description of the field
  value: any; // (must be present and must use the field's type); one of the allowed values
  desc: string; // a description of the value (if unknown just use the value again)
}

interface IQoreTypeObject extends IQoreAppShared {
  name: string; // the technical name of the field
  type: IQoreType | IQoreTypeObject; // either a string or a data object again
  example_value?: any; // (values must use the field's type) any example value to use when generating example data etc
  default_value?: any; // (values must use the field's type) the default value if none is provided by the user
  allowed_values?: IQoreAllowedValue[]; // an array of objects providing the only values allowed for the field
  attr?: Record<string, any>; // an optional data object with any properties
}

export interface IQoreAppActionOption extends IQoreAppShared {
  default_value?: any;
  example_value?: any;
  loc?: string;
  ref_data?: string;
  required?: boolean;
  sensitive?: boolean;
  type: IQoreType | IQoreTypeObject;
}

export interface IQoreAppActionWithoutFunction extends IQoreAppAction {
  action_code: 1;
}

export interface IQoreAppActionWithFunction extends IQoreAppAction {
  action_code: 2;
  app_function: TQoreAppActionFunction;
  options: Record<string, IQoreAppActionOption>;
  response_type: Record<string, IQoreType | IQoreTypeObject>;
}

export class QoreAppActionsApi {}
