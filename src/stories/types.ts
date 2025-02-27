import { TReqoreIntent } from '@qoretechnologies/reqore/dist/constants/theme';
import { Meta } from '@storybook/react';

export interface IDocumentationParam {
  // TODO: Type is now optional but needs to be REQUIRED in the future
  label: string;
  link?: string;
  description?: string;
  optional?: boolean;
  type?: string;
}
export interface IDocumentationReturns {
  label: string;
  link?: string;
  intent?: TReqoreIntent;
}

export type TDocumentationParams = Record<string, IDocumentationParam>;
export type TDocumentationReturns = {
  description: string;
  types: IDocumentationReturns[];
};
export type TDocumentationLabel =
  | string
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  | undefined;

export interface IDocumentationProps extends IMethodDocs {}

export interface IDocumentationMeta extends Meta {}
export interface IDocumentationStory extends Meta {}

export interface IDocumentationProperty {
  name: string;
  comments?: IComments;
  type: IReturnType | IReturnType[];
}

export interface IDocumentationClass {
  name: string;
  constructor: IDocumentationClassConstructor;
  properties: IDocumentationProperty[];
  methods?: IMethodDocs[];
  comments: IComments;
}

export interface IDocumentationClassConstructor {
  accessibility: 'private' | 'public' | string;
  parameters: IDocumentationClassConstructorParams[];
}

export interface IDocumentationClassConstructorParams {
  name: string;
  type: string | IReturnType | IReturnType[];
}

export interface IMethodDocs {
  async: boolean;
  name: string | undefined;
  label: string | undefined;
  params: IMethodParamTypes[];
  comments: IComments;
  returnTypes: IReturnType | IReturnType[];
  accessibility: string | undefined;
}

export interface IMethodJson {
  className: string;
  data: IMethodDocs[] | undefined;
}

export interface IInterfaceDocsProperties {
  label: string;
  description?: string | null;
  type?: IReturnType | IReturnType[];
}

export interface IInterfaceDocs {
  name: string;
  comments?: { summary: string | null };
  params?: IInterfaceDocsProperties[];
}

export interface ITypeAliasDocs {
  name: string;
  comments?: { summary: string | null };
  type?: IReturnType | IReturnType[];
}

export interface IComments {
  summary: string | undefined | null;
  returnSummary?: string | undefined;
}

export interface IMethodParamTypes {
  label: string;
  type?: string | IReturnType | IReturnType[];
  description?: string | undefined | null;
}

export interface IMethodReturnType {
  label: string;
}

export interface IParamType {
  kind: string;
  type: string;
}

export interface IJson {
  kind: Kind;
  name?: string;
  type?: IParamType | string;
  types?: {
    kind: string;
    type?: string;
    name?: string;
  }[];
  typeArguments?: {
    kind: Kind;
    types?: { kind: Kind; type: string; name?: string }[];
    type?: string;
  }[];
}

export enum Kind {
  Array = 'array',
  Conditional = 'conditional',
  IndexedAccess = 'indexedAccess',
  Inferred = 'inferred',
  Intersection = 'intersection',
  Intrinsic = 'intrinsic',
  Literal = 'literal',
  Mapped = 'mapped',
  NamedTupleMember = 'namedTupleMember',
  Optional = 'optional',
  Predicate = 'predicate',
  Query = 'query',
  Reference = 'reference',
  Reflection = 'reflection',
  Rest = 'rest',
  TemplateLiteral = 'templateLiteral',
  Tuple = 'tuple',
  TypeOperator = 'typeOperator',
  Union = 'union',
  Unknown = 'unknown',
}

export interface IReturnType {
  masterType?: string;
  separatorSymbol?: '|' | ',' | '&' | string;
  type: string[] | string;
  fullType?: string;
}

// export interface IDocumentationData {}
