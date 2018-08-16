import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import CenteredView from '/mobile/ui/CenteredView';
import styled from '/mobile/ui/styled';

import ChannelLabel from '.';

storiesOf('ChannelLabel', module)
  .addDecorator((getStory) => <CenteredView>{getStory()}</CenteredView>)
  .add('Default', () => <ChannelLabel label={'Default'} />)
  .add('isLoading', () => <ChannelLabel label={'Default'} isLoading />)
  .add('With Icon', () => <ChannelLabel label={'Albums'} icon={'like-solid'} />)
  .add('isLoading With Icon', () => (
    <ChannelLabel label={'Albums'} icon={'like-solid'} isLoading />
  ))
  .add('withFlex', () => {
    const Wrapper = styled({
      flex: 1,
      width: '100%',
    })(View);

    const Box = styled({
      flex: 3,
      backgroundColor: 'salmon',
    })(View);

    return (
      <Wrapper>
        <ChannelLabel label={'Albums'} icon={'arrow-back'} withFlex />
        <Box />
      </Wrapper>
    );
  });
