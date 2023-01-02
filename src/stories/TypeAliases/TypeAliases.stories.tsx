import { ReqoreSpacer } from '@qoretechnologies/reqore';
import { DocumentationExample } from '../components/example';
import { DocumentationItem } from '../components/item';
import { DocumentationWrapper } from '../components/wrapper';
import { QorusAuthenticatorDemo } from '../QorusAuthenticator/demo';
import { IDocumentationMeta, IDocumentationStory } from '../types';
import { argsData, prepareTypeStory } from '../utils';

export default {
  title: 'Typings/TypeAliases',
  id: 'types',
  argTypes: {
    ...argsData,
  },
} as IDocumentationMeta;

const Template: IDocumentationStory = ({ comments, ...rest }, context) => {
  return (
    <DocumentationWrapper
      title="Qorus Type Aliases"
      description="Custom Type Aliases for QorusToolkit"
      // code="import { QorusValidator } from '@qoretechnologies/qorus-toolkit'"
    >
      <DocumentationItem {...rest}>{comments.summary}</DocumentationItem>
      <DocumentationExample label={context.story} />
      <ReqoreSpacer height={20} />
      <QorusAuthenticatorDemo />
    </DocumentationWrapper>
  );
};

export const Version = prepareTypeStory(Template, 'Version');
Version.storyName = 'Version';

export const Context = prepareTypeStory(Template, 'Context');
Context.storyName = 'Context';

export const QorusEndpointId = prepareTypeStory(Template, 'QorusEndpointId');
QorusEndpointId.storyName = 'QorusEndpointId';

export const QorusEndpointURL = prepareTypeStory(Template, 'QorusEndpointURL');
QorusEndpointURL.storyName = 'QorusEndpointURL';

export const Token = prepareTypeStory(Template, 'Token');
Token.storyName = 'Token';

export const ResponseError = prepareTypeStory(Template, 'ResponseError');
ResponseError.storyName = 'ResponseError';

export const DataProviderChildrenConstructorOptions = prepareTypeStory(
  Template,
  'DataProviderChildrenConstructorOptions',
);
DataProviderChildrenConstructorOptions.storyName = 'DataProviderChildrenConstructorOptions';

export const ObjectWithStringKey = prepareTypeStory(Template, 'ObjectWithStringKey');
ObjectWithStringKey.storyName = 'ObjectWithStringKey';

export const ObjectWithAnyValue = prepareTypeStory(Template, 'ObjectWithAnyValue');
ObjectWithAnyValue.storyName = 'ObjectWithAnyValue';

export const DefaultHeaders = prepareTypeStory(Template, 'DefaultHeaders');
DefaultHeaders.storyName = 'DefaultHeaders';
