import { EQoreAppActionCode } from '../types/qore/apps';
import { TQoreOptions } from '../types/qore/options';
import { QoreAppCreator } from './QoreAppCreator';

const opts: TQoreOptions = {
  string: {
    type: 'softstring',
    example_value: '123',
    default_value: '123',
  },
  number: {
    type: '*double',
    example_value: 123,
    default_value: 123,
    get_default_value: () => 123,
    get_allowed_values: (context) => {
      console.log(context?.opts?.string);
      return [{ value: 123 }];
    },
  },
  list: {
    type: 'list',
    example_value: [123],
    default_value: [123],
    allowed_values: [
      {
        value: 123,
      },
    ],
  },
};

QoreAppCreator.createLocalizedAction({
  action: 'test',
  action_code: EQoreAppActionCode.ACTION,
  app: 'test',
  options: opts,
});
