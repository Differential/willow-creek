import React from 'react';
import renderer from 'react-test-renderer';
import { Text, Animated } from 'react-native';

import Providers from '../../Providers';

import Picker, { Item, Picker as UnwrappedPicker } from '.';

describe('The Picker Input component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <Picker
          placeholder="Select a language..."
          label="Languages"
          displayValue="Display Value"
          prefix={<Text>Hello there!</Text>}
          suffix={<Text>Goodbye now.</Text>}
        >
          <Item label="Java" value="java" />
          <Item label="JavaScript" value="js" />
        </Picker>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });

  it('focuses and blurs', () => {
    const focus = jest.fn();
    const blur = jest.fn();
    const tree = renderer.create(
      <Providers>
        <UnwrappedPicker
          focusAnimation={new Animated.Value(0)}
          onFocus={focus}
          onBlur={blur}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
    tree.root.findByType(UnwrappedPicker).instance.handleOnPress();
    expect(tree).toMatchSnapshot();
    expect(focus).toHaveBeenCalled();
    tree.root.findByType(UnwrappedPicker).instance.handleOnPress();
    expect(tree).toMatchSnapshot();
    expect(blur).toHaveBeenCalled();
  });
});
