export interface QorusLibrary {
  functions: QorusLibraryFunctions;
  classes: QorusLibraryClasses;
  constants: QorusLibraryConstants;
  pipelines: QorusLibraryPipelines;
  fsm: QorusLibraryQogs;
  mapper: QorusLibraryMappers;
}

export interface QorusLibraryItem {
  name: string;
  id: number;
  version?: string;
}

export interface QorusLibraryFunctions {
  [functionName: string]: QorusLibraryFunction;
}

export interface QorusLibraryClasses {
  [className: string]: QorusLibraryClass;
}

export interface QorusLibraryConstants {
  [constantName: string]: QorusLibraryConstant;
}

export interface QorusLibraryPipelines {
  [pipelineName: string]: QorusLibraryPipeline;
}

export interface QorusLibraryMappers {
  [mapperName: string]: QorusLibraryMapper;
}

export interface QorusLibraryQogs {
  [qogName: string]: QorusLibraryQog;
}

export interface QorusLibraryClass extends QorusLibraryItem {}

export interface QorusLibraryConstant extends QorusLibraryItem {}

export interface QorusLibraryPipeline extends QorusLibraryItem {}

export interface QorusLibraryMapper extends QorusLibraryItem {}

export interface QorusLibraryQog extends QorusLibraryItem {}

export interface QorusLibraryFunction extends QorusLibraryItem {}
