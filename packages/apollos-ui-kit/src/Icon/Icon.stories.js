import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { kebabCase } from 'lodash';

import CenteredView from '../CenteredView';

import * as icons from './icons';

import Icon from '.';

const stories = storiesOf('Icon', module).addDecorator((getStory) => (
  <CenteredView>{getStory()}</CenteredView>
));

Object.keys(icons).forEach((iconName) => {
  stories.add(iconName, () => <Icon name={kebabCase(iconName)} />);
});

stories.add('isLoading', () => <Icon name={'umbrella'} isLoading />);
