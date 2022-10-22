import { Meta } from '@storybook/react';

import { Icon } from '@@/Icon';

import { LoadingButton } from './LoadingButton';

export default {
  component: LoadingButton,
  title: 'Components/Buttons/LoadingButton',
} as Meta;

interface Args {
  loadingText: string;
  isLoading: boolean;
}

function Template({ loadingText, isLoading }: Args) {
  return (
    <LoadingButton loadingText={loadingText} isLoading={isLoading}>
      <Icon icon="download" />
      Download
    </LoadingButton>
  );
}

Template.args = {
  loadingText: 'loading',
  isLoading: false,
};

export const Example = Template.bind({});

export function IsLoading() {
  return (
    <LoadingButton loadingText="loading" isLoading>
      <Icon icon="download" />
      Download
    </LoadingButton>
  );
}
