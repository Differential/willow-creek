import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { BodyText } from '/mobile/ui/typography';

import ButtonLink from './ButtonLink';

storiesOf('Buttons/Link', module)
  .add('default', () => <ButtonLink onPress={() => {}}>Boom</ButtonLink>)
  .add('Inherits typographic styles', () => (
    <BodyText>
      <ButtonLink onPress={() => {}}>Boom</ButtonLink>
    </BodyText>
  ));
