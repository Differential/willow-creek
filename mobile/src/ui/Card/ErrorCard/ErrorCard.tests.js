import React from 'react';
import renderer from 'react-test-renderer';

import TestProviders from 'TestProviders';

import ErrorCard from './';

describe('the Card component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <TestProviders>
        <ErrorCard message={'Boom!'} error={'What?'} />
      </TestProviders>
    );

    expect(tree).toMatchSnapshot();
  });
  it('should render with an error message inside an object', () => {
    const errorObject = {
      message: 'You have discovered an error message. Do you open it?',
    };
    const tree = renderer.create(
      <TestProviders>
        <ErrorCard error={errorObject} />
      </TestProviders>
    );

    expect(tree).toMatchSnapshot();
  });
  it('should render with an error inside an object', () => {
    const errorObject = {
      error: 'Errors, errors, and more errors',
    };
    const tree = renderer.create(
      <TestProviders>
        <ErrorCard error={errorObject} />
      </TestProviders>
    );

    expect(tree).toMatchSnapshot();
  });
});
