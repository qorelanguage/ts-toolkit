export interface QorusLibrary {
  functions?: QorusLibraryFunction[];
  classes?: QorusLibraryClass[];
  constants?: QorusLibraryConstant[];
  pipelines?: QorusLibraryPipeline[];
  fsm?: QorusLibraryQog[];
  mapper?: QorusLibraryMapper[];
}

export interface QorusLibraryItem {
  name: string;
  id: number;
  version?: string;
}

export interface QorusLibraryClass extends QorusLibraryItem {}

export interface QorusLibraryConstant extends QorusLibraryItem {}

export interface QorusLibraryPipeline extends QorusLibraryItem {}

export interface QorusLibraryMapper extends Pick<QorusLibraryItem, 'name' | 'version'> {
  mapperid: number;
  type: 'Mapper';
}

export interface QorusLibraryQog extends QorusLibraryItem {}

export interface QorusLibraryFunction extends QorusLibraryItem {}

export interface QorusLibraryValueMap extends QorusLibraryItem {
  throws_exception: boolean;
  valuetype: string;
  mapsize: number;
}
