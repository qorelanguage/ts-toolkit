export type TQorusInterfaces = 'mapper' | 'workflow' | 'service' | 'job' | 'connection';

/* Types used in UIs, these are not 1:1 to Qore types */
export type TQorusStringCompatibleUIType =
  | 'binary'
  | 'date'
  | 'url'
  | 'email'
  | 'string'
  | 'file-as-string'
  | 'long-string'
  | 'enum'
  | 'url';
export type TQorusNumberCompatibleUIType = 'int' | 'integer' | 'float' | 'number';
export type TQorusListCompatibleUIType = 'list' | 'range';
export type TQorusHashCompatibleUIType = 'hash' | 'data' | 'rgbcolor';
export type TQorusNullCompatibleUIType = 'null' | 'nothing';
export type TQorusAnyCompatibleUIType = 'any' | 'auto';
export type TQorusBooleanCompatibleUIType = 'bool' | 'boolean';
export type TQorusSpecialUIType = 'richtext' | 'data-provider';

export type TQorusType =
  | TQorusInterfaces
  | TQorusStringCompatibleUIType
  | TQorusNumberCompatibleUIType
  | TQorusListCompatibleUIType
  | TQorusHashCompatibleUIType
  | TQorusNullCompatibleUIType
  | TQorusAnyCompatibleUIType
  | TQorusBooleanCompatibleUIType
  | TQorusSpecialUIType
  | 'context';
