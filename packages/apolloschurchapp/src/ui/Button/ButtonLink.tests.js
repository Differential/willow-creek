import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'apolloschurchapp/src/Providers';
import { BodyText } from 'apolloschurchapp/src/ui/typography';

import ButtonLink from './ButtonLink';

describe('The Button component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <ButtonLink onPress={() => {}}>Boom</ButtonLink>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render inherit typographic styles', () => {
    const tree = renderer.create(
      <Providers>
        <BodyText>
          <ButtonLink onPress={() => {}}>Boom</ButtonLink>
        </BodyText>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
