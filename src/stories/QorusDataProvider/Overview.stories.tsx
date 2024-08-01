import { DocumentationOverview } from '../components/overview';
import { IDocumentationMeta, IDocumentationStory } from '../types';
import { argsData } from '../utils';

export default {
  title: 'API/QorusDataProvider',
  id: 'QorusDataProvider',
  argTypes: {
    ...argsData,
  },
  render: () => {
    return <DocumentationOverview name="QorusDataProvider" />;
  },
} as IDocumentationMeta;

export const Overview: IDocumentationStory = {};
