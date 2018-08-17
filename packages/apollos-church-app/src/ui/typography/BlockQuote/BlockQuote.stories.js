import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { withIsLoading } from 'apollos-church-app/src/ui/isLoading';
import PaddedView from 'apollos-church-app/src/ui/PaddedView';

import BlockQuote from '.';

storiesOf('typography/BlockQuote', module)
  .add('Default', () => (
    <PaddedView>
      <BlockQuote>
        {
          '"You are the only Bible some unbelievers will ever read." – John MacArthur'
        }
      </BlockQuote>
    </PaddedView>
  ))
  .add('isLoading', () => {
    const SetIsLoading = withIsLoading(PaddedView);

    return (
      <SetIsLoading isLoading>
        <BlockQuote>
          {
            '"You are the only Bible some unbelievers will ever read." – John MacArthur'
          }
        </BlockQuote>
      </SetIsLoading>
    );
  });
