import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ScrollView } from 'react-native';

import { BodyText } from 'apollos-church-app/src/ui/typography';
import PaddedView from 'apollos-church-app/src/ui/PaddedView';

import Paragraph from '.';

storiesOf('typography/Paragraph', module)
  .add('Default', () => (
    <ScrollView>
      <PaddedView>
        <Paragraph>
          <BodyText>
            {`But I, brothers, could not address you as spiritual people, but as people of the flesh, as infants in Christ. I fed you with milk, not solid food, for you were not ready for it. And even now you are not yet ready, for you are still of the flesh. For while there is jealousy and strife among you, are you not of the flesh and behaving only in a human way? For when one says, "I follow Paul," and another, "I follow Apollos," are you not being merely human?`}
          </BodyText>
        </Paragraph>

        <Paragraph>
          <BodyText>
            {`What then is Apollos? What is Paul? Servants through whom you believed, as the Lord assigned to each. I planted, Apollos watered, but God gave the growth. So neither he who plants nor he who waters is anything, but only God who gives the growth. He who plants and he who waters are one, and each will receive his wages according to his labor. For we are God's fellow workers. You are God's field, God's building.`}
          </BodyText>
        </Paragraph>

        <Paragraph>
          <BodyText>
            {`According to the grace of God given to me, like a skilled[b] master builder I laid a foundation, and someone else is building upon it. Let each one take care how he builds upon it. For no one can lay a foundation other than that which is laid, which is Jesus Christ. Now if anyone builds on the foundation with gold, silver, precious stones, wood, hay, straw— each one's work will become manifest, for the Day will disclose it, because it will be revealed by fire, and the fire will test what sort of work each one has done. If the work that anyone has built on the foundation survives, he will receive a reward. If anyone's work is burned up, he will suffer loss, though he himself will be saved, but only as through fire.`}
          </BodyText>
        </Paragraph>
      </PaddedView>
    </ScrollView>
  ))
  .add('isLoading', () => (
    <ScrollView>
      <PaddedView>
        <Paragraph isLoading>
          <BodyText>
            {`But I, brothers, could not address you as spiritual people, but as people of the flesh, as infants in Christ. I fed you with milk, not solid food, for you were not ready for it. And even now you are not yet ready, for you are still of the flesh. For while there is jealousy and strife among you, are you not of the flesh and behaving only in a human way? For when one says, "I follow Paul," and another, "I follow Apollos," are you not being merely human?`}
          </BodyText>
        </Paragraph>

        <Paragraph isLoading>
          <BodyText>
            {`What then is Apollos? What is Paul? Servants through whom you believed, as the Lord assigned to each. I planted, Apollos watered, but God gave the growth. So neither he who plants nor he who waters is anything, but only God who gives the growth. He who plants and he who waters are one, and each will receive his wages according to his labor. For we are God's fellow workers. You are God's field, God's building.`}
          </BodyText>
        </Paragraph>

        <Paragraph isLoading>
          <BodyText>
            {`According to the grace of God given to me, like a skilled[b] master builder I laid a foundation, and someone else is building upon it. Let each one take care how he builds upon it. For no one can lay a foundation other than that which is laid, which is Jesus Christ. Now if anyone builds on the foundation with gold, silver, precious stones, wood, hay, straw— each one's work will become manifest, for the Day will disclose it, because it will be revealed by fire, and the fire will test what sort of work each one has done. If the work that anyone has built on the foundation survives, he will receive a reward. If anyone's work is burned up, he will suffer loss, though he himself will be saved, but only as through fire.`}
          </BodyText>
        </Paragraph>
      </PaddedView>
    </ScrollView>
  ))
  .add('Border Box – platform testing', () => {
    const border = { borderWidth: 1, borderStyle: 'solid' };

    return (
      <ScrollView>
        <Paragraph style={border}>
          <BodyText>
            {`But I, brothers, could not address you as spiritual people, but as people of the flesh, as infants in Christ. I fed you with milk, not solid food, for you were not ready for it. And even now you are not yet ready, for you are still of the flesh. For while there is jealousy and strife among you, are you not of the flesh and behaving only in a human way? For when one says, "I follow Paul," and another, "I follow Apollos," are you not being merely human?`}
          </BodyText>
        </Paragraph>

        <Paragraph style={border}>
          <BodyText>
            {`What then is Apollos? What is Paul? Servants through whom you believed, as the Lord assigned to each. I planted, Apollos watered, but God gave the growth. So neither he who plants nor he who waters is anything, but only God who gives the growth. He who plants and he who waters are one, and each will receive his wages according to his labor. For we are God's fellow workers. You are God's field, God's building.`}
          </BodyText>
        </Paragraph>

        <Paragraph style={border}>
          <BodyText>
            {`According to the grace of God given to me, like a skilled[b] master builder I laid a foundation, and someone else is building upon it. Let each one take care how he builds upon it. For no one can lay a foundation other than that which is laid, which is Jesus Christ. Now if anyone builds on the foundation with gold, silver, precious stones, wood, hay, straw— each one's work will become manifest, for the Day will disclose it, because it will be revealed by fire, and the fire will test what sort of work each one has done. If the work that anyone has built on the foundation survives, he will receive a reward. If anyone's work is burned up, he will suffer loss, though he himself will be saved, but only as through fire.`}
          </BodyText>
        </Paragraph>
      </ScrollView>
    );
  });
