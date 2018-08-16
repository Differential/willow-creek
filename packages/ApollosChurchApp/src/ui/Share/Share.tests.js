import React from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from '/mobile/ui/theme';

import Share from '.';

describe('the Share component', () => {
  it('should render', () => {
    const shareObject = {
      title: 'Shared Object Title',
      url: 'https://github.com/ApollosProject/apollos-prototype',
      message: 'Share this with all your friends and family',
    };
    const tree = renderer.create(
      <ThemeProvider>
        <Share content={shareObject} />
      </ThemeProvider>
    );
    expect(tree).toMatchSnapshot();
  });
});
