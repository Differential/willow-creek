import React from 'react';
import renderer from 'react-test-renderer';
import { kebabCase } from 'lodash';

import Providers from 'apolloschurchapp/src/Providers';

import * as icons from './icons';

import Icon from '.';

Object.keys(icons).forEach((iconName) => {
  describe(`The ${iconName} icon`, () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <Providers>
          <Icon name={kebabCase(iconName)} />
        </Providers>
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
