import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { H3, H7, BodyText, Paragraph } from 'ui/typography';
import Button, { ButtonLink } from 'ui/Button';

import { Card, CardActions, CardContent, CardImage } from './';

storiesOf('Card', module)
  .add('simple', () => (
    <Card>
      <CardImage source={'https://picsum.photos/600/400/?image=63'} />
      <CardContent>
        <H3>Coffee</H3>
        <H7>noun</H7>
        <Paragraph>
          <BodyText>
            {
              'A dark substance that turns "leave me alone" into "good morning!"'
            }
          </BodyText>
        </Paragraph>
      </CardContent>
      <CardActions>
        <Button title="Learn More" pill={false} />
        <ButtonLink>Share</ButtonLink>
      </CardActions>
    </Card>
  ))
  .add('loading', () => (
    <Card isLoading>
      <CardImage />
      <CardContent>
        <H3 />
        <H7 />
        <Paragraph>
          <BodyText />
        </Paragraph>
      </CardContent>
      <CardActions>
        <Button pill={false} />
        <ButtonLink />
      </CardActions>
    </Card>
  ));
