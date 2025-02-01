import { TQoreAppAction, TQoreAppEventAction, TQoreAppNonEventAction } from '../types/qore/actions';
import { IQoreAppSharedNotLocalized, TQoreAppWithActions } from '../types/qore/apps';
import { TQoreOptions, TQoreOptionsNotLocalized } from '../types/qore/options';

/* A class to create Qore Qog Apps */
export class QoreAppCreator {
  /* Creates a trigger function to be used in an App */
  public static createTrigger<TOptions extends TQoreOptionsNotLocalized>(
    trigger: TQoreAppEventAction<TOptions> & IQoreAppSharedNotLocalized,
  ): TQoreAppEventAction<TOptions> & IQoreAppSharedNotLocalized {
    return trigger;
  }

  /* Creates a trigger function to be used in an App
     with localized strings, this does not require manually
     providing display_name, desc, and short_desc but instead
     requires the proper translations to be available in the localization file
  */
  public static createLocalizedTrigger<TOptions extends TQoreOptions>(
    trigger: TQoreAppEventAction<TOptions>,
  ): TQoreAppEventAction<TOptions> {
    return trigger;
  }

  /* Creates an action function to be used in an App */
  public static createAction<TOptions extends TQoreOptionsNotLocalized>(
    action: TQoreAppNonEventAction<TOptions> & IQoreAppSharedNotLocalized,
  ): TQoreAppNonEventAction<TOptions> & IQoreAppSharedNotLocalized {
    return action;
  }

  /* Creates an action function to be used in an App
     with localized strings, this does not require manually
     providing display_name, desc, and short_desc but instead
     requires the proper translations to be available in the localization file
  */
  public static createLocalizedAction<TOptions extends TQoreOptions>(
    action: TQoreAppNonEventAction<TOptions>,
  ): TQoreAppNonEventAction<TOptions> {
    return action;
  }

  /* Creates an App with triggers and actions */
  public static createApp<Actions extends TQoreAppAction<any>[]>(
    app: TQoreAppWithActions<Actions> & IQoreAppSharedNotLocalized,
  ): TQoreAppWithActions<Actions> & IQoreAppSharedNotLocalized {
    return app;
  }

  /* Creates an App with triggers and actions
     with localized strings, this does not require manually
     providing display_name, desc, and short_desc but instead
     requires the proper translations to be available in the localization file
  */
  public static createLocalizedApp<Actions extends TQoreAppAction<any>[]>(
    app: TQoreAppWithActions<Actions>,
  ): TQoreAppWithActions<Actions> {
    return app;
  }
}
