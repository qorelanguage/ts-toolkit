import { DocumentationOverview } from '../components/overview';
import { IDocumentationMeta, IDocumentationStory } from '../types';
import { argsData } from '../utils';

export default {
  title: 'API/QorusRequest',
  id: 'QorusRequest',
  argTypes: {
    ...argsData,
  },
  render: () => {
    return <DocumentationOverview name="QorusRequest" />;
  },
} as IDocumentationMeta;

export const Overview: IDocumentationStory = {};
