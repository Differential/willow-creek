import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'Providers';

import { Paragraph } from './Paragraph';

describe('The Paragraph placeholder', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Providers>
        <Paragraph />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders multiple lines', () => {
    const tree = renderer.create(
      <Providers>
        <Paragraph lineNumber={50} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('has varying width lines', () => {
    const tree = renderer.create(
      <Providers>
        <Paragraph lastLineWidth={33} firstLineWidth={'23%'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('accepts custom line styles', () => {
    const customStyle = { height: 33 };

    const tree = renderer.create(
      <Providers>
        <Paragraph lineStyle={customStyle} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('accepts custom styles', () => {
    const customStyle = { backgroundColor: 'salmon' };

    const tree = renderer.create(
      <Providers>
        <Paragraph style={customStyle} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
