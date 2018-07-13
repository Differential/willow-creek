import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

import Providers from 'Providers';

import Paragraph from '.';

describe('the UIText component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <Paragraph>
          <Text>
            {`But I, brothers, could not address you as spiritual people, but as
              people of the flesh, as infants in Christ. I fed you with milk, not
              solid food, for you were not ready for it. And even now you are not
              yet ready, for you are still of the flesh. For while there is jealousy
              and strife among you, are you not of the flesh and behaving only in a
              human way? For when one says, "I follow Paul," and another, "I follow
              Apollos," are you not being merely human?`}
          </Text>
        </Paragraph>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading state', () => {
    const tree = renderer.create(
      <Providers>
        <Paragraph isLoading>
          <Text>
            {`But I, brothers, could not address you as spiritual people, but as
              people of the flesh, as infants in Christ. I fed you with milk, not
              solid food, for you were not ready for it. And even now you are not
              yet ready, for you are still of the flesh. For while there is jealousy
              and strife among you, are you not of the flesh and behaving only in a
              human way? For when one says, "I follow Paul," and another, "I follow
              Apollos," are you not being merely human?`}
          </Text>
        </Paragraph>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
