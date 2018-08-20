import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { H1 } from 'apolloschurchapp/src/ui/typography';
import styled from 'apolloschurchapp/src/ui/styled';

import FlexedView from '.';

storiesOf('FlexedView', module).add('Example', () => {
  const FlexedSalmonView = styled({
    backgroundColor: 'salmon',
  })(FlexedView);

  return (
    <FlexedView>
      <FlexedSalmonView>
        <H1>This box is in a FlexedView</H1>
      </FlexedSalmonView>
    </FlexedView>
  );
});
