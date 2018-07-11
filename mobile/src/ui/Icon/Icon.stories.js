import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { kebabCase } from 'lodash';

import CenterView from 'storybook/decorators/CenterView';

import * as icons from './icons';

import Icon from './';

const stories = storiesOf('Icon', module).addDecorator((getStory) => (
  <CenterView>{getStory()}</CenterView>
));

Object.keys(icons).forEach((iconName) => {
  stories.add(iconName, () => <Icon name={kebabCase(iconName)} />);
});

stories.add('isLoading', () => <Icon name={'umbrella'} isLoading />);
