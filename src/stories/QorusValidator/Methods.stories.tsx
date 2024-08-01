import { Documentation } from '../components/documentation';
import { IDocumentationMeta } from '../types';
import { argsData, getClassData, newMethodStory } from '../utils';

export default {
  title: 'API/QorusValidator/Methods',
  id: 'QorusValidator.methods',
  argTypes: {
    ...argsData,
  },
  render: ({ comments, ...rest }, context) => {
    const {
      name,
      comments: { summary },
    } = getClassData('QorusValidator');

    return (
      <Documentation
        {...rest}
        itemName={rest.name}
        name={name}
        description={summary || undefined}
        summary={comments.summary}
        story={context.story}
      ></Documentation>
    );
  },
} as IDocumentationMeta;

const Template = {};

const prepareStory = newMethodStory(Template, 'QorusValidator');

export const getTypeFromValue = prepareStory('getTypeFromValue');
getTypeFromValue.storyName = 'getTypeFromValue';

export const validate = prepareStory('validate');
validate.storyName = 'validate';
