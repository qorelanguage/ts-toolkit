import { ReqoreSpacer } from '@qoretechnologies/reqore';
import { DocumentationExample } from '../components/example';
import { DocumentationItem } from '../components/item';
import { DocumentationWrapper } from '../components/wrapper';
import { QorusAuthenticatorDemo } from '../QorusAuthenticator/demo';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData, prepareStory } from '../utils';

export default {
  title: 'API/QorusDataProvider',
  argTypes: {
    ...argsData,
  },
} as DocumentationMeta;

const Template: DocumentationStory = ({ comments, ...rest }, context) => {
  return (
    <DocumentationWrapper
      title="Qorus DataProvider"
      description="Helper for authentication"
      code="import { QorusDataProvider } from '@qoretechnologies/qorus-toolkit'"
    >
      <DocumentationItem {...rest}>{comments.summary}</DocumentationItem>
      <DocumentationExample label={context.story} />
      <ReqoreSpacer height={20} />
      <QorusAuthenticatorDemo />
    </DocumentationWrapper>
  );
};

const className = 'QorusDataProvider';

export const getRecord = prepareStory(Template, 'getRecord', className);
export const getType = prepareStory(Template, 'getType', className);
export const has = prepareStory(Template, 'has', className);
export const hasData = prepareStory(Template, 'hasData', className);
export const setData = prepareStory(Template, 'setData', className);
export const setPath = prepareStory(Template, 'setPath', className);
