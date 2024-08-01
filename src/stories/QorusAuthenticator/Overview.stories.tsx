import { DocumentationOverview } from '../components/overview';
import { IDocumentationMeta } from '../types';
import { argsData } from '../utils';

export default {
  title: 'API/QorusAuthenticator',
  id: 'QorusAuthenticator',
  argTypes: {
    ...argsData,
  },
  render: () => {
    return <DocumentationOverview name="QorusAuthenticator" />;
  },
} as IDocumentationMeta;

export const Overview = {};
