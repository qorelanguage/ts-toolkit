import { Documentation } from '../components/documentation';
import { IDocumentationMeta } from '../types';
import { argsData, getClassData, newClassPropertyStory } from '../utils';

export default {
  title: 'API/QorusDataProvider/Properties',
  id: 'QorusDataProvider.properties',
  argTypes: {
    ...argsData,
  },
  render: ({ comments, ...rest }, context) => {
    const {
      name,
      comments: { summary },
    } = getClassData('QorusDataProvider');

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

const Template = 'Property';
const prepareStory = newClassPropertyStory(Template, 'QorusDataProvider');

export const path = prepareStory('path');
path.storyName = 'path';

export const responseData = prepareStory('responseData');
responseData.storyName = 'responseData';

export const context = prepareStory('context');
context.storyName = 'context';

export const responseError = prepareStory('responseError');
responseError.storyName = 'responseError';
