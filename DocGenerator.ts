import fs from 'fs';
import {
  ClassMethodParser,
  ClassParser,
  InterfaceParser,
  InterfacePropertyParser,
  ProjectParser,
} from 'typedoc-json-parser';
import { InterfaceDocs, Json, MethodDocs, MethodParamTypes, MethodReturnType, ParamType } from './src/stories/types';

export const parsedProjectDocs = './src/stories/docs.ts';
export const typedocDocs = './docs/documentation.json';

class DocGenerator {
  project: ProjectParser;
  allClasses: ClassParser[] = [];
  allInterfaces: InterfaceParser[] = [];

  constructor() {
    // Reading docs generated by typedoc
    const raw = fs.readFileSync(typedocDocs, { encoding: 'utf-8' });
    // Converting to JSON
    const parsedData = JSON.parse(raw);
    const projectData: ProjectParser | undefined = new ProjectParser({ data: parsedData });
    this.project = projectData;

    let classObj: ClassParser[] = [];
    this.project.namespaces?.forEach((namespace) => {
      classObj = [...classObj, ...namespace.classes];
    });
    this.allClasses = classObj;

    let interfaceObject: InterfaceParser[] = [];
    this.project.namespaces.forEach((namespace) => {
      interfaceObject = [...interfaceObject, ...namespace.interfaces];
    });
    this.allInterfaces = interfaceObject;
  }

  getProject() {
    return this.project;
  }

  getClass(className: string): ClassParser | undefined {
    return this.allClasses.find((classObj) => classObj.name === className);
  }

  getInterface(interfaceName: string): InterfaceParser | undefined {
    return this.allInterfaces.find((obj) => obj.name === interfaceName);
  }

  getAllInterfaces(): InterfaceParser[] | undefined {
    return this.allInterfaces;
  }

  createInterfaceDocs(interfaceObject?: InterfaceParser | string) {
    let interfaceObj: InterfaceParser | undefined;
    if (typeof interfaceObject === 'string') {
      interfaceObj = this.getInterface(interfaceObject);
    } else {
      interfaceObj = interfaceObject;
    }

    if (!interfaceObj) {
      return undefined;
    }

    const properties = interfaceObj.properties.map((property) => {
      const propertyDocs = {
        name: property.name,
        comment: property.comment.description,
        type: this.getInterfacePropertyType(property),
      };
      return propertyDocs;
    });

    const docs: InterfaceDocs = {
      name: interfaceObj.name,
      comment: interfaceObj.comment.description,
      properties: properties,
    };

    return docs;
  }

  getInterfacePropertyType(property: InterfacePropertyParser) {
    const adjustedType = this.getAdjustedType(property.type);
    const prop = property as any;
    let propertyType;
    if (adjustedType === 'union') {
      propertyType = prop.type.types.map((propertyNew) => {
        if (propertyNew.name) {
          const propDocs = {
            name: propertyNew.name,
            type: this.getAdjustedType(propertyNew.type),
          };
          return propDocs;
        } else return undefined;
      });
    } else {
      propertyType = [{ name: property.name, type: adjustedType }];
    }
    return propertyType;
  }

  createAllInterfacesJson() {
    const docs = this.allInterfaces.map((obj) => {
      const objDocs = this.createInterfaceDocs(obj);
      return objDocs;
    });
    return docs;
  }

  getAllClasses(): ClassParser[] | undefined {
    return this.allClasses;
  }

  createAllDocsJson() {
    const classesDocs = this.createAllClassesJson();
    const methodDocs = this.createAllMethodsJson();
    const interfaceDocs = this.createAllInterfacesJson();

    // Create a typescript file that exports an object containing classesDocs and methodDocs
    fs.writeFileSync(
      parsedProjectDocs,
      `export default { classesDocs: ${JSON.stringify(classesDocs)}, methodDocs: ${JSON.stringify(
        methodDocs,
      )},interfaceDocs: ${JSON.stringify(interfaceDocs)}, }`,
    );

    // Writing parsed project data to file
    //fs.writeFileSync(parsedProjectDocs, { classesDocs, methodDocs });

    return {
      classesDocs,
      methodDocs,
      interfaceDocs,
    };
  }

  createAllMethodsJson() {
    const allClasses = this.getAllClasses();
    const allMethodDocs = allClasses?.map((classObj) => {
      const className = classObj?.name;
      const classMethods = classObj.methods.map((method) => {
        const methodDocs = {
          className: classObj.name,
          data: this.getMethodDocs(method.name, className),
        };
        return methodDocs;
      });
      return classMethods;
    });
    return allMethodDocs;
  }

  createAllClassesJson() {
    const allClasses = this.getAllClasses();
    const allCalssesDocs = allClasses?.map((classObj) => {
      const classDocs = this.getClassDocs(classObj.name);
      return classDocs;
    });
    return allCalssesDocs;
  }

  createAllMethodsDocs(classObj: string | ClassParser): (MethodDocs | undefined)[] | undefined {
    let classObject: ClassParser | undefined;
    if (typeof classObj === 'string') {
      classObject = this.getClass(classObj);
    } else classObject = classObj;

    if (classObject) {
      const methods = classObject.methods;
      const methodsDocs = methods.map((method) => {
        return this.getMethodDocs(method.name, classObject);
      });
      return methodsDocs;
    }
    return undefined;
  }

  getClassDocs(classObj: string | ClassParser) {
    let classObject: ClassParser | undefined;
    if (typeof classObj === 'string') {
      classObject = this.allClasses.find((obj) => obj.name === classObj);
    } else {
      classObject = classObj;
    }

    if (!classObject || !classObject.name) {
      return undefined;
    }

    const name = classObject.name;
    const comment = {
      description: classObject.comment.description,
      blockTags: classObject.comment.blockTags,
    };
    const properties = classObject.properties.map((property) => {
      const prop = property as any;
      const obj = {
        name: property.name,
        comment: {
          description: property.comment.description,
          blockTags: property.comment.blockTags,
        },
        type: {
          kind: property.type.kind,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          name: prop.type.name ?? prop.type.type,
        },
      };

      return obj;
    });

    const docs = {
      name,
      comment,
      properties,
    };

    return docs;
  }

  private getClassObj = (classObject?: string | ClassParser): ClassParser | undefined => {
    let classObj: ClassParser | undefined;
    if (typeof classObject === 'string') {
      classObj = this.getClass(classObject);
    } else classObj = classObject;
    if (!classObj) return undefined;
    else return classObj;
  };

  getMethodDocs(methodName: string, classObject?: ClassParser | string | undefined): MethodDocs | undefined {
    const classObj = this.getClassObj(classObject);
    if (!classObj) return undefined;
    const method = this.getMethod(methodName, classObj);
    const label = this.createMethodDefinition(method);
    const name = method?.name;
    const parameters = this.createParameterDefinition(method);
    const comments = this.createCommentDocs(method);
    const returnTypes = this.createReturnTypes(method);
    const async = this.isAsyncMethod(method);
    const docs = {
      async,
      name,
      label,
      params: parameters,
      comments,
      returnTypes,
    };
    return docs;
  }

  /**
   * If the method's return type is a Promise, then it's an async method
   * @param {any | undefined} method - any | undefined
   * @returns A boolean value.
   */
  isAsyncMethod(method: ClassMethodParser | undefined): boolean {
    const json: Json | undefined = method?.signatures[0].returnType;

    if (json?.name === 'Promise') return true;
    else return false;
  }

  /**
   * If the classObj is not undefined, return the method with the given name from the classObj's
   * methods array, or undefined if no such method exists.
   * @param {string} methodName - The name of the method you want to find.
   * @param {any | undefined} classObj - The class object that you want to search for the method in.
   * @returns The method object with the name that matches the methodName parameter.
   */
  getMethod(methodName: string, classObj: ClassParser | undefined): ClassMethodParser | undefined {
    if (!classObj) return undefined;
    return classObj.methods?.find((method) => method.name === methodName);
  }

  /**
   * It takes a string and returns an object with a label property that has the same value as the string
   * @param {string} label - The label of the type.
   * @returns An object with a label property.
   */
  private createTypeObject(label: string) {
    return {
      label: label,
    };
  }

  /**
   * It takes a method object and returns an array of MethodReturnType objects
   * @param {any | undefined} method - any | undefined
   * @returns An array of MethodReturnType objects.
   */
  createReturnTypes(method: ClassMethodParser | undefined): MethodReturnType[] | undefined {
    const returnType: Json | undefined = method?.signatures[0].returnType.toJSON();
    if (returnType?.kind === 'union') {
      const types = returnType.types?.map((type) => {
        const adjustedType = this.getAdjustedType(type);
        const obj = this.createTypeObject(adjustedType);
        return obj;
      });
      return types;
    }
    const typeArguments = returnType?.typeArguments?.[0];

    if (typeArguments?.kind === 'union') {
      const reversedTypes = typeArguments.types?.reverse();
      const types = reversedTypes?.map((type) => {
        const adjustedType = this.getAdjustedType(type);
        const obj = this.createTypeObject(adjustedType);
        return obj;
      });
      return types;
    }

    const adjustedType = this.getAdjustedType(typeArguments?.type);
    const types = this.createTypeObject(adjustedType);
    return [types];
  }

  /**
   * It takes a method and returns an object with the method's summary and return summary
   * @param {any | undefined} method - any | undefined
   * @returns An object with the summary and returnSummary properties.
   */
  private createCommentDocs(method: ClassMethodParser | undefined) {
    const comments = method?.signatures[0].comment;
    const summary = comments?.description;
    const returnSummary = comments?.blockTags.find((tag) => tag.name === 'returns')?.text;
    const commentDocs = {
      summary,
      returnSummary,
    };

    return commentDocs;
  }

  getAdjustedType(json: any): string {
    if (json?.name) {
      return json.name;
    } else if (json?.type) {
      return (json.type as ParamType).type ?? json.type;
    } else {
      return json?.kind;
    }
  }

  /**
   * It takes a method from the parsed documentation and returns an array of objects that contain the
   * name, type, and description of each parameter
   * @param {any | undefined} method - any | undefined
   * @returns An array of objects with the following properties:
   * - label
   * - type
   * - description
   */
  private createParameterDefinition(method: ClassMethodParser | undefined): MethodParamTypes[] {
    const parameters = method?.signatures[0].parameters;
    /*eslint-disable */
    let parsedParameters: { label: string; type?: string | undefined; description?: string | null }[] = []; // eslint-disable-line no-use-before-define
    /*eslint-enable */

    /* It's iterating over the parameters array and creating an object for each parameter. */
    parameters?.forEach((parameter) => {
      const json: Json | undefined = parameter?.type.toJSON();
      const type = this.getAdjustedType(json);

      const obj = {
        label: parameter.name,
        type: type,
        description: parameter.comment.description,
      };
      parsedParameters.push(obj);
    });
    return parsedParameters;
  }

  /**
   * It takes a method object and returns a string that represents the method's signature
   * @param {any | undefined} method - any | undefined
   * @returns A string that is a method definition.
   */
  private createMethodDefinition(method: any | undefined) {
    let methodDefinition = '';
    const methodSignature = method?.signatures[0];
    const parameters = method?.signatures[0].parameters;
    const returnType = method?.signatures[0].returnType;
    methodDefinition += `${methodSignature?.name}(`;

    let parameterString = '';
    parameterString += parameters?.map((parameter) => {
      let parameterDefinition = '';
      parameterDefinition += `' '${parameter.name}`;
      const json: Json = parameter.type;
      const parameterType = json.name ? json.name : json.type ? json.type : json.kind;
      parameterDefinition += `: ${parameterType}`;
      return parameterDefinition;
    });
    methodDefinition += parameterString + ' )';

    let returnString = ': ';
    const json: Json | undefined = returnType;

    if (json?.name === 'Promise') {
      returnString += 'Promise< ';
      if (json.typeArguments?.[0].kind === 'union') {
        const reversedTypes = json.typeArguments?.[0].types?.reverse();
        reversedTypes?.map((type, index) => {
          returnString += type.name ? type.name : type.type;
          if (index + 1 !== json.typeArguments?.[0].types?.length) returnString += ' | ';
          if (index + 1 === json.typeArguments?.[0].types?.length) returnString += ' >';
        });
      } else {
        const reversedTypes = json.typeArguments?.reverse();
        reversedTypes?.map((type) => {
          returnString += type.type;
          returnString += ' >';
        });
      }
    }
    if (json?.kind === 'union') {
      const reversedTypes = json.types?.reverse();
      reversedTypes?.map((type, index) => {
        returnString += type.name ? type.name : type.type;
        if (index + 1 !== json.types?.length) returnString += ' | ';
      });
    }
    if (json?.kind === 'reference' && json?.name !== 'Promise') {
      returnString += json.name;
    }
    if (returnString !== ': ') methodDefinition += returnString;
    return methodDefinition;
  }
}
export default new DocGenerator();

const docs = new DocGenerator();
docs.createAllDocsJson();
