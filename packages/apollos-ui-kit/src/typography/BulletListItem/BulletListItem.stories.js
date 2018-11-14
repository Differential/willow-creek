import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { withIsLoading } from '../../isLoading';
import PaddedView from '../../PaddedView';

import BulletListItem from '.';

storiesOf('typography/BulletListItem', module)
  .add('Default', () => (
    <PaddedView>
      <BulletListItem>
        {`"God's work done in God's way will never lack God's supplies." – Hudson Taylor`}
      </BulletListItem>
    </PaddedView>
  ))
  .add('isLoading', () => {
    const SetIsLoading = withIsLoading(PaddedView);

    return (
      <SetIsLoading isLoading>
        <BulletListItem>
          {`"God's work done in God's way will never lack God's supplies." – Hudson Taylor`}
        </BulletListItem>
      </SetIsLoading>
    );
  });
