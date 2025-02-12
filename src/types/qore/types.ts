import { IQoreSharedObject, TQoreAppActionOption } from './options';

export type TQoreStringCompatibleType =
  | 'string'
  | '*string'
  | 'softstring'
  | '*string'
  | 'binary'
  | 'date'
  | 'base64binary'
  | 'base64urlbinary'
  | 'hexbinary'
  | 'softdate'
  | '*softstring'
  | '*softdate'
  | '*binary'
  | '*date'
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

export type TQoreNumberCompatibleType =
  | 'int'
  | '*number'
  | '*float'
  | '*double'
  | '*integer'
  | 'float'
  | 'number'
  | 'integer'
  | 'double'
  | 'softint'
  | 'softfloat'
  | 'softnumber'
  | '*softint'
  | '*softfloat'
  | '*softnumber'
  | '*int'
  | 'unixts'
  | '*unixts'
  | 'unixtsms'
  | '*unixtsms';
export type TQoreHashCompatibleType = 'hash' | '*hash' | '*data' | 'data';
export type TQoreListCompatibleType = 'list' | '*list' | 'softlist' | '*softlist';
export type TQoreBooleanCompatibleType = 'boolean' | '*boolean' | 'softbool' | '*bool' | '*bool' | 'bool' | '*softbool';
export type TQoreNullableType = 'NULL' | 'nothing';
export type TQoreAnyType = 'all' | 'any' | 'auto';

export type TQoreSimpleType = TQoreSimpleTypeNonList | TQoreListCompatibleType;

export type TQoreSimpleTypeNonList =
  | TQoreStringCompatibleType
  | TQoreNumberCompatibleType
  | TQoreHashCompatibleType
  | TQoreBooleanCompatibleType
  | TQoreNullableType
  | TQoreAnyType;

export type TQoreType = TQoreSimpleType | TQoreTypeObject;

// Mapping between string literals and their corresponding TypeScript types
export type TQoreTypeMapping = {
  string: string;
  number: number;
  hash: Record<string, any>;
  list: unknown[];
  boolean: boolean;
  [key: string]: any;
};

export interface IQoreTypeObjectNonList<TypeValue = unknown> extends Omit<IQoreSharedObject<TypeValue>, 'type'> {
  // Type has to be a string
  type: TQoreSimpleTypeNonList;
  // the technical name of the field
  name?: string;
  // an optional object with the fields of the object
  fields?: Record<string, TQoreAppActionOption>;
}

export type TQoreTypeObject<TypeValue = unknown> = IQoreTypeObjectNonList<TypeValue> | IQoreTypeObjectList<TypeValue>;

export interface IQoreTypeObjectList<TypeValue = unknown> extends Omit<IQoreSharedObject<TypeValue>, 'type'> {
  // Type has to be a string
  type: TQoreListCompatibleType;
  // the technical name of the field
  name?: string;
  // description of a list type; only valid if \c type is "list" or "softlist"
  element_type?: TQoreType;
}
