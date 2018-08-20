import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import UIText from '.';

storiesOf('typography/UIText', module)
  .add('Normal', () => (
    <UIText>
      {
        '"You are the only Bible some unbelievers will ever read." – John MacArthur'
      }
    </UIText>
  ))
  .add('Bold', () => (
    <UIText bold>
      {
        '"You are the only Bible some unbelievers will ever read." – John MacArthur'
      }
    </UIText>
  ))
  .add('Italic', () => (
    <UIText italic>
      {
        '"You are the only Bible some unbelievers will ever read." – John MacArthur'
      }
    </UIText>
  ))
  .add('Bold Italic', () => (
    <UIText bold italic>
      {
        '"You are the only Bible some unbelievers will ever read." – John MacArthur'
      }
    </UIText>
  ))
  .add('isLoading', () => (
    <UIText isLoading>
      {
        '"You are the only Bible some unbelievers will ever read." – John MacArthur'
      }
    </UIText>
  ))
  .add('Border Box – platform testing', () => {
    const border = { borderWidth: 1, borderStyle: 'solid' };

    return (
      <View>
        <UIText style={border}>UI Text</UIText>
        <UIText style={border}>
          {
            '"You are the only Bible some unbelievers will ever read." – John MacArthur'
          }
        </UIText>
      </View>
    );
  });
