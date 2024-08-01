import { Documentation } from '../components/documentation';
import { IDocumentationMeta } from '../types';
import { argsData, getClassData, newClassPropertyStory } from '../utils';

export default {
  title: 'API/QorusAuthenticator/Properties',
  id: 'QorusAuthenticator.properties',
  argTypes: {
    ...argsData,
  },
  render: ({ comments, ...rest }, context) => {
    const {
      name,
      comments: { summary },
    } = getClassData('QorusAuthenticator');

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

const prepareStory = newClassPropertyStory(Template, 'QorusAuthenticator');

export const allApiPaths = prepareStory('allApiPaths');
allApiPaths.storyName = 'allApiPaths';

export const apiPathsAuthenticator = prepareStory('apiPathsAuthenticator');
apiPathsAuthenticator.storyName = 'apiPathsAuthenticator';

export const endpoints = prepareStory('endpoints');
endpoints.storyName = 'endpoints';

export const selectedEndpoint = prepareStory('selectedEndpoint');
selectedEndpoint.storyName = 'selectedEndpoint';
