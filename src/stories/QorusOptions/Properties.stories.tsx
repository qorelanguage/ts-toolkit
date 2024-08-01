import { Documentation } from '../components/documentation';
import { IDocumentationMeta, IDocumentationStory } from '../types';
import { argsData, getClassData, newClassPropertyStory } from '../utils';

export default {
  title: 'API/QorusOptions/Properties',
  id: 'QorusOptions.properties',
  argTypes: {
    ...argsData,
  },
  render: ({ comments, ...rest }, context) => {
    const {
      name,
      comments: { summary },
    } = getClassData('QorusOptions');

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

const Template: IDocumentationStory = 'Property';
const prepareStory = newClassPropertyStory(Template, 'QorusOptions');

export const name = prepareStory('name');
name.storyName = 'name';

export const qorusOptions = prepareStory('qorusOptions');
qorusOptions.storyName = 'qorusOptions';
