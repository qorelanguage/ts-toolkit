import { Documentation } from '../components/documentation';
import { IDocumentationMeta } from '../types';
import { argsData, getClassData, newClassPropertyStory } from '../utils';

export default {
  title: 'API/QorusRequest/Properties',
  id: 'QorusRequest.properties',
  argTypes: {
    ...argsData,
  },
  render: ({ comments, ...rest }, context) => {
    const {
      name,
      comments: { summary },
    } = getClassData('QorusRequest');

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
const prepareStory = newClassPropertyStory(Template, 'QorusRequest');

export const defaultHeaders = prepareStory('defaultHeaders');
defaultHeaders.storyName = 'defaultHeaders';
