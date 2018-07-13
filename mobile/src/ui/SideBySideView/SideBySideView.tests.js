import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import SideBySide, { ResponsiveSideBySideView, Left, Right } from '.';

describe('The SideBySide component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <SideBySide>
        <View />
        <View />
      </SideBySide>
    );
    expect(tree).toMatchSnapshot();
  });
});

describe('The ResponsiveSideBySideView component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <ResponsiveSideBySideView>
        <View />
        <View />
      </ResponsiveSideBySideView>
    );
    expect(tree).toMatchSnapshot();
  });
});

describe('The Right component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Right>
        <View />
        <View />
      </Right>
    );
    expect(tree).toMatchSnapshot();
  });
});

describe('The Left component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Left>
        <View />
        <View />
      </Left>
    );
    expect(tree).toMatchSnapshot();
  });
});
