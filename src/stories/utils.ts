import docs from './docs';
import {
  IDocumentationClass,
  IDocumentationProperty,
  IDocumentationProps,
  IInterfaceDocs,
  IMethodDocs,
  ITypeAliasDocs,
} from './types';

export interface IArgData {
  description?: string;
  name?: string;
  control?: any;
  options?: string[];
  type?: string;
  table?: any;
}

export type TArg<T> = { [key: string]: (IArgData & { defaultValue?: T }) | undefined };
export type TDisabledArg = { [key: string]: { table: { disable: boolean } } };

export const argManager = <Target>() => {
  return {
    createArg<K extends keyof Target>(name: K, data: IArgData & { defaultValue?: Target[K] }): TArg<Target[K]> {
      return {
        [name as string]: data,
      };
    },
    disableArg<K extends keyof Target>(name: K): TDisabledArg {
      return {
        [name]: {
          table: {
            disable: true,
          },
        },
      };
    },
    disableArgs<K extends keyof Target>(names: K[]): TDisabledArg {
      return names.reduce((newArgs: TDisabledArg, name) => {
        return {
          ...newArgs,
          ...{
            [name]: {
              table: {
                disable: true,
              },
            },
          },
        };
      }, {});
    },
  };
};

/* Creating a new instance of the argManager with the type of IDocumentationProps. */
const documentationArgs = argManager<IDocumentationProps>();

export const argsData = {
  ...documentationArgs.disableArgs(['label', 'params', 'returnTypes', 'comments']),
};

export const getAllMethodsFromClass = (className: string) => {
  const methods: IMethodDocs[] = [];

  docs.methodDocs.forEach((method) => {
    if (method?.className === className) {
      methods.push(method.data as IMethodDocs);
    }
  });

  return methods;
};

export const doesClassExist = (className: string) => {
  const classDocs: IDocumentationClass = docs.classesDocs.find((classDoc) => classDoc.name === className)!;

  return classDocs ? true : false;
};

export const getClassData = (className: string): IDocumentationClass => {
  const classDocs: IDocumentationClass = docs.classesDocs.find((classDoc) => classDoc.name === className)!;

  classDocs.methods = getAllMethodsFromClass(className);

  return classDocs;
};

export const getMethodData = (methodName: string, className: string) => {
  let selectedMethod;

  docs.methodDocs.forEach((method) => {
    if (method?.className && method.data.name) {
      if (method.className === className && method.data.name === methodName) {
        selectedMethod = method;
      }
    }
  });

  return selectedMethod;
};

export const getInterfaceData = (interfaceName: string): IInterfaceDocs | undefined => {
  let selectedInterface: IInterfaceDocs = {
    name: '',
  };
  docs.interfaceDocs.forEach((interfaceDoc) => {
    if (interfaceDoc.name === interfaceName) {
      selectedInterface = interfaceDoc;
    }
  });

  return selectedInterface;
};

export const getTypeAliasData = (typeAliasName: string): ITypeAliasDocs | undefined => {
  let selectedTypeAlias: ITypeAliasDocs = {
    name: '',
  };
  docs.typeAliasDocs.forEach((typeAliasDocs) => {
    if (typeAliasDocs.name === typeAliasName) {
      selectedTypeAlias = typeAliasDocs;
    }
  });

  return selectedTypeAlias;
};

export const getClassPropertyData = (propertyName: string, className: string): IDocumentationProperty | undefined => {
  const classObj: IDocumentationClass = docs.classesDocs.find(
    (classD) => classD.name === className,
  ) as IDocumentationClass;
  const property = classObj?.properties.find((prop) => prop.name === propertyName);
  return property;
};

export const prepareMethodStory = (_template: any, methodName: string, className: string) => {
  const selectedMethod = getMethodData(methodName, className);

  const story: any = {};
  const docData: IMethodDocs | undefined = selectedMethod?.data;

  story.storyName = methodName;
  story.args = docData;

  return story;
};

export const getTypeOrInterfaceData = (typeOrInterfaceName: string) => {
  const selectedTypeOrInterface = getInterfaceData(typeOrInterfaceName);

  if (selectedTypeOrInterface?.name) {
    return selectedTypeOrInterface;
  }

  return getTypeAliasData(typeOrInterfaceName);
};

export const prepareInterfaceStory = (_template: any, interfaceName: string) => {
  const selectedInterface = getInterfaceData(interfaceName);

  const story: any = {};
  const docData: IInterfaceDocs | undefined = selectedInterface;

  story.storyName = interfaceName;
  story.args = docData;

  return story;
};

export const prepareTypeStory = (_template: any, typeAliasName: string) => {
  const selectedTypeAlias = getTypeAliasData(typeAliasName);

  const story: any = {};
  const docData: IInterfaceDocs | undefined = selectedTypeAlias;

  story.storyName = typeAliasName;
  story.args = docData;

  return story;
};

export const prepareClassPropertyStory = (_template: any, propertyName: string, className: string) => {
  const propertyDocs = getClassPropertyData(propertyName, className);

  const story: any = {};
  const docData: IDocumentationProperty | undefined = propertyDocs as IDocumentationProperty;

  story.storyName = propertyName;
  story.args = docData;

  return story;
};

export const newMethodStory = (template: any, className: string) => (methodName: string) => {
  return prepareMethodStory(template, methodName, className);
};

export const newClassPropertyStory = (template: any, className: string) => (propertyName: string) => {
  return prepareClassPropertyStory(template, propertyName, className);
};

export const newTypeAliasStory = (template: any) => (typeAliasName: string) => {
  return prepareTypeStory(template, typeAliasName);
};
export const newInterfaceStory = (template: any) => (interfaceName: string) => {
  return prepareInterfaceStory(template, interfaceName);
};

// Check if a string is starting with a capital letter
export const isCapitalized = (str: string) => {
  // First check if the first letter str is an alphabet letter
  if (!str.charAt(0).match(/[a-z]/i)) {
    return false;
  }

  return str.charAt(0) === str.charAt(0).toUpperCase();
};

// Turn string to Capital case with spaces
export const toCapitalCase = (str?: string) => {
  return str?.replace(/([A-Z])/g, ' $1').replace(/^./, (strNew) => strNew.toUpperCase());
};
