import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import PaddedView from 'ui/PaddedView';
import { Paragraph, BodyText } from 'ui/typography';

import H3 from '.';

storiesOf('typography/H3', module)
  .add('Default', () => (
    <H3>
      {
        '"The Christian shoemaker does his duty not by putting little crosses on the shoes, but by making good shoes, because God is interested in good craftsmanship." ― Martin Luther'
      }
    </H3>
  ))
  .add('padded', () => (
    <PaddedView>
      <Paragraph>
        <BodyText>
          <BodyText italic>Paragraph</BodyText>
          {
            " blessed is the man who doesn't walk in the counsel of the wicked, nor stand in the way of sinners, nor sit in the seat of scoffers; but his delight is in Yahweh's law. On his law he meditates day and night. He will be like a tree planted by the streams of water, that brings forth its fruit in its season, whose leaf also does not wither. Whatever he does shall prosper. The wicked are not so, but are like the chaff which the wind drives away. Therefore the wicked shall not stand in the judgment, nor sinners in the congregation of the righteous. For Yahweh knows the way of the righteous, but the way of the wicked shall perish."
          }
        </BodyText>
      </Paragraph>
      <H3 padded>Padded Heading The Story of The Longest Heading Ever</H3>
      <Paragraph>
        <BodyText>
          <BodyText italic>Paragraph</BodyText>
          {
            " why do the nations rage, and the peoples plot a vain thing? The kings of the earth take a stand, and the rulers take counsel together, against Yahweh, and against his Anointed, saying, «Let's break their bonds apart, and cast their cords from us. He who sits in the heavens will laugh. The LORD will have them in derision. Then he will speak to them in his anger, and terrify them in his wrath: Yet I have set my King on my holy hill of Zion.» I will tell of the decree. Yahweh said to me, You are my son. Today I have become your father. Ask of me, and I will give the nations for your inheritance, the uttermost parts of the earth for your possession. You shall break them with a rod of iron. You shall dash them in pieces like a potter's vessel. Now therefore be wise, you kings. Be instructed, you judges of the earth. Serve Yahweh with fear, and rejoice with trembling. Give sincere homage to the Son, lest he be angry, and you perish in the way, for his wrath will soon be kindled. Blessed are all those who take refuge in him."
          }
        </BodyText>
      </Paragraph>
    </PaddedView>
  ))
  .add('isLoading', () => (
    <H3 isLoading>
      {
        '"The Christian shoemaker does his duty not by putting little crosses on the shoes, but by making good shoes, because God is interested in good craftsmanship." ― Martin Luther'
      }
    </H3>
  ))
  .add('Border Box – platform testing', () => {
    const border = { borderWidth: 1, borderStyle: 'solid' };

    return (
      <View>
        <H3 style={border}>Heading 3</H3>
        <H3 style={border}>
          {
            '"The Christian shoemaker does his duty not by putting little crosses on the shoes, but by making good shoes, because God is interested in good craftsmanship." ― Martin Luther'
          }
        </H3>
      </View>
    );
  });
