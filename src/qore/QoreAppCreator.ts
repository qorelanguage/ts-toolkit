import { TQoreAppEventAction, TQoreAppNonEventAction, TQoreAppWithActions, TQoreOptions } from '../types/qore';

/* A class to create Qore Qog Apps */
export class QoreAppCreator {
  /* Creates a trigger function to be used in an App */
  public static createTrigger<TOptions extends TQoreOptions>(
    trigger: TQoreAppEventAction<TOptions>,
  ): TQoreAppEventAction<TOptions> {
    return trigger;
  }

  /* Creates an action function to be used in an App */
  public static createAction<TOptions extends TQoreOptions>(
    action: TQoreAppNonEventAction<TOptions>,
  ): TQoreAppNonEventAction<TOptions> {
    return action;
  }

  /* Creates an App with triggers and actions */
  public static createApp<Actions>(app: TQoreAppWithActions<Actions>): TQoreAppWithActions<Actions> {
    return app;
  }
}
