import { DocumentationOverview } from '../components/overview';
import { IDocumentationMeta, IDocumentationStory } from '../types';
import { argsData } from '../utils';

export default {
  title: 'API/QorusOptions',
  id: 'QorusOptions',
  argTypes: {
    ...argsData,
  },
  render: () => {
    return <DocumentationOverview name="QorusOptions" />;
  },
} as IDocumentationMeta;

export const Overview: IDocumentationStory = {};
