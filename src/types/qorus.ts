export type TQorusInterfaces =
  | 'mapper'
  | 'workflow'
  | 'service'
  | 'job'
  | 'connection'
  | 'constant'
  | 'class'
  | 'errors'
  | 'fsm'
  | 'function'
  | 'group'
  | 'mapper-code'
  | 'queue'
  | 'pipeline'
  | 'sla'
  | 'step'
  | 'type'
  | 'value-map';

/* Types used in UIs, these are not 1:1 to Qore types */
export type TQorusStringCompatibleUIType = 'binary' | 'date' | 'email' | 'string' | 'long-string' | 'enum' | 'url';
export type TQorusNumberCompatibleUIType = 'int' | 'integer' | 'float' | 'number';
export type TQorusListCompatibleUIType = 'list' | 'range' | 'free-list';
export type TQorusHashCompatibleUIType = 'hash' | 'data' | 'rgbcolor' | 'free-hash';
export type TQorusNullCompatibleUIType = 'null' | 'nothing';
export type TQorusAnyCompatibleUIType = 'any' | 'auto';
export type TQorusBooleanCompatibleUIType = 'bool' | 'boolean';
export type TQorusSpecialUIType = 'richtext' | 'data-provider' | 'context' | 'file';

export type TQorusType =
  | TQorusInterfaces
  | TQorusStringCompatibleUIType
  | TQorusNumberCompatibleUIType
  | TQorusListCompatibleUIType
  | TQorusHashCompatibleUIType
  | TQorusNullCompatibleUIType
  | TQorusAnyCompatibleUIType
  | TQorusBooleanCompatibleUIType
  | TQorusSpecialUIType;

export type QorusProgrammingLanguage = 'qore' | 'python' | 'java';

export interface QorusConfigItem {
  type: TQorusType;
  desc: string;
  strictly_local?: boolean;
  config_group?: string;
  sensitive?: boolean;
  prefix?: string;
  value: any;
  level?: string;
  is_set?: boolean;
  is_templated_string?: boolean;
}

export interface QorusInterfaceGroups {
  [groupName: string]: {
    name: string;
    enabled?: boolean;
    size: number;
  };
}

export interface QorusInterfaceTags {
  [tagName: string]: any;
}
