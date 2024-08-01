import { DocumentationOverview } from '../components/overview';
import { IDocumentationMeta, IDocumentationStory } from '../types';
import { argsData } from '../utils';

export default {
  title: 'API/QorusValidator',
  id: 'QorusValidator',
  argTypes: {
    ...argsData,
  },
  render: () => {
    return <DocumentationOverview name="QorusValidator" />;
  },
} as IDocumentationMeta;

export const Overview: IDocumentationStory = {};
