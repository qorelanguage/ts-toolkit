export interface IQoreAppShared {
  display_name: string;
  short_desc: string;
  desc?: string;
}
export interface IQoreApp extends IQoreAppShared {
  name: string;
}

export interface IQoreAppAction extends IQoreAppShared {
  app: string;
  action: string;
  action_code: 1 | 2; // What are other possible values?
}

export type TQoreAppActionFunction = (obj?: string | Record<string, any>) => any;

export interface IQoreAppActionWithFunction extends IQoreAppAction {
  action_code: 2
  app_function: TQoreAppActionFunction;
}

export class QoreAppActionsApi {

}