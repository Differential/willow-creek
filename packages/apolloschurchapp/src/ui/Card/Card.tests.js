import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'apolloschurchapp/src/Providers';
import { H3, H6, BodyText, Paragraph } from 'apolloschurchapp/src/ui/typography';
import Button, { ButtonLink } from 'apolloschurchapp/src/ui/Button';

import Card, { CardImage, CardContent, CardActions } from '.';

describe('the Card component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <Card>
          <CardImage source={'https://picsum.photos/600/400/?image=63'} />
          <CardContent>
            <H3>Coffee</H3>
            <H6 padded>noun</H6>
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
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('it should render a placeholder', () => {
    const tree = renderer.create(
      <Providers>
        <Card isLoading>
          <CardContent>
            <H3 />
            <H6 padded />
            <Paragraph>
              <BodyText />
            </Paragraph>
          </CardContent>
          <CardActions>
            <Button pill={false} />
            <ButtonLink />
          </CardActions>
        </Card>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
