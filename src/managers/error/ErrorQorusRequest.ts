import BaseError from './Error';
import { errorCodes } from './errorCodes';

class ErrorQorusRequest extends BaseError {
  constructor(error: IErrorQorusRequestParams | string) {
    if (typeof error === 'string') {
      super(error, true, errorCodes.INTERNAL.name, undefined);
    } else if (typeof error.desc === 'undefined') {
      super(`${JSON.stringify(error)}`, true, errorCodes.INTERNAL.name, undefined);
    } else {
      super(error.desc, true, error.err, error.status);
    }
  }
}

export interface IErrorQorusRequestParams {
  desc: string;
  err: string;
  status: number;
}

export default ErrorQorusRequest;
