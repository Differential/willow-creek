import React from 'react';
import { renderWithApolloData } from '../../utils/testUtils';
import Providers from '../../Providers';
import getShareContent from './getShareContent';
import ShareContentButtonConnected from '.';

const shareMock = {
  request: {
    query: getShareContent,
    variables: { itemId: '1' },
  },
  result: {
    data: {
      node: {
        id: '1',
        __typename: 'ContentSeriesContentItem',
        sharing: {
          url: 'https://WillowCreekApp.newspring.cc',
          title: 'Test Title ',
          __typename: 'SharableContentItem',
        },
      },
    },
  },
};

const mocks = [shareMock];

describe('the ShareContentButtonConnected', () => {
  it('renders a share button', async () => {
    const tree = await renderWithApolloData(
      <Providers mocks={mocks}>
        <ShareContentButtonConnected itemId={'1'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders a share button with custom url, and title', async () => {
    const tree = await renderWithApolloData(
      <Providers mocks={mocks}>
        <ShareContentButtonConnected
          itemId={'1'}
          url={'https://apollosrock.com'}
          title="Some great title"
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
