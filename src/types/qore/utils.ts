import { OpenAPIV2 } from 'openapi-types';
import { IQoreBaseAppAction } from './actions';
import { TCustomConnOptions } from './options';

export type THttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type TAllowedPaths<CustomConnOptions extends TCustomConnOptions = TCustomConnOptions> = Record<
  string,
  Partial<Record<THttpMethod, IAllowedPathData<CustomConnOptions>>>
>;
export interface IAllowedPathData<CustomConnOptions extends TCustomConnOptions = TCustomConnOptions>
  extends Partial<Omit<IQoreBaseAppAction, 'action_code' | 'app'>> {
  processor?: (
    data: OpenAPIV2.OperationObject,
  ) => Partial<Omit<IQoreBaseAppAction<CustomConnOptions>, 'action_code' | 'app'>>;

  // optional list of vars in swagger_path (ex: '/{id}/{key}') that should not have option dependencies created
  independent_path_vars?: string[];
}
