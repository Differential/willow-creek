/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';

import FlexedView from 'apollos-church-app/src/ui/FlexedView';
import { H3, H6, BodyText } from 'apollos-church-app/src/ui/typography';

import { ThemeProvider } from './';
import { withThemeMixin } from './mixins';

const TypeExample = () => (
  <FlexedView>
    <H3>Hi there!</H3>
    <H6>Lorem ipsum dolor sit amet.</H6>
    <BodyText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales
      sit amet ante eu lobortis. In vitae faucibus lectus, at interdum nibh.
      Fusce suscipit tincidunt justo, vitae cursus mi fermentum eget.
    </BodyText>
  </FlexedView>
);

const DarkTypeExample = withThemeMixin({
  type: 'dark',
})(TypeExample);

const TypeExampleWithProps = withThemeMixin(({ color, isLight = true }) => ({
  type: isLight ? 'light' : 'dark',
  colors: {
    primary: color,
  },
}))(TypeExample);

describe('withThemeMixin', () => {
  it('overrides styles without affecting siblings', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <FlexedView>
          <TypeExample />
          <DarkTypeExample />
          <TypeExample />
        </FlexedView>
      </ThemeProvider>
    );
    expect(tree).toMatchSnapshot();
  });
  it('works with dynamic props', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <FlexedView>
          <TypeExampleWithProps isLight color="red" />
          <TypeExampleWithProps isLight={false} color="blue" />
        </FlexedView>
      </ThemeProvider>
    );
    expect(tree).toMatchSnapshot();
  });
});
