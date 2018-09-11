import React from 'react';
import { ScrollView } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import PaddedView from 'apolloschurchapp/src/ui/PaddedView';

import Item from './Item';

const genesis1 = {
  scripture: {
    reference: 'Genesis 1:1-5',
    html:
      '<p class="p"><span data-number="1" class="v">1</span>In the beginning, God created the heavens and the earth. <span data-number="2" class="v">2</span>The earth was formless and empty. Darkness was on the surface of the deep and God’s Spirit was hovering over the surface of the waters.</p><p class="p"><span data-number="3" class="v">3</span>God said, “Let there be light,” and there was light. <span data-number="4" class="v">4</span>God saw the light, and saw that it was good. God divided the light from the darkness. <span data-number="5" class="v">5</span>God called the light “day”, and the darkness he called “night”. There was evening and there was morning, the first day.</p>',
  },
};

const psalm23 = {
  scripture: {
    reference: 'Psalm 23',
    html:
      '<p class="d">A Psalm by David.</p><p class="q1"><span data-number="1" class="v">1</span>Yahweh is my shepherd:</p><p class="q2">I shall lack nothing.</p><p class="q1"><span data-number="2" class="v">2</span>He makes me lie down in green pastures.</p><p class="q2">He leads me beside still waters.</p><p class="q1"><span data-number="3" class="v">3</span>He restores my soul.</p><p class="q2">He guides me in the paths of righteousness for his name’s sake.</p><p class="q1"><span data-number="4" class="v">4</span>Even though I walk through the valley of the shadow of death,</p><p class="q2">I will fear no evil, for you are with me.</p><p class="q1">Your rod and your staff,</p><p class="q2">they comfort me.</p><p class="q1"><span data-number="5" class="v">5</span>You prepare a table before me</p><p class="q2">in the presence of my enemies.</p><p class="q1">You anoint my head with oil.</p><p class="q2">My cup runs over.</p><p class="q1"><span data-number="6" class="v">6</span>Surely goodness and loving kindness shall follow me all the days of my life,</p><p class="q2">and I will dwell in Yahweh’s house forever.</p>',
  },
};

const songOfSolomon1 = {
  scripture: {
    reference: 'Song of Solomon 1:1-4',
    html:
      '<p class="p"><span data-number="1" class="v">1</span>The Song of songs, which is Solomon’s.</p><p class="sp">Beloved</p><p class="q1"><span data-number="2" class="v">2</span>Let him kiss me with the kisses of his mouth;</p><p class="q2">for your love is better than wine.</p><p class="q1"><span data-number="3" class="v">3</span>Your oils have a pleasing fragrance.</p><p class="q2">Your name is oil poured out,</p><p class="q2">therefore the virgins love you.</p><p class="q1"><span data-number="4" class="v">4</span>Take me away with you.</p><p class="q2">Let’s hurry.</p><p class="q2">The king has brought me into his rooms.</p><p class="sp">Friends</p><p class="q1">We will be glad and rejoice in you.</p><p class="q2">We will praise your love more than wine!</p><p class="sp">Beloved</p><p class="q1">They are right to love you.</p>',
  },
};

const john3 = {
  scripture: {
    reference: 'John 3:16-17',
    html:
      '<p class="p"><span data-number="16" class="v">16</span><span class="wj">For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life. </span><span data-number="17" class="v">17</span><span class="wj">For God didn’t send his Son into the world to judge the world, but that the world should be saved through him. </span></p>',
  },
};

const revelation22 = {
  scripture: {
    reference: 'Revelation 22:20-21',
    html:
      '<p class="p"><span data-number="20" class="v">20</span>He who testifies these things says, <span class="wj">“Yes, I come quickly.” </span></p><p class="p">Amen! Yes, come, Lord Jesus.</p><p class="p"><span data-number="21" class="v">21</span>The grace of the Lord Jesus Christ be with all the saints. Amen.</p>',
  },
};

const stories = storiesOf('Scripture', module);

stories.add('Genesis 1:1-5', () => (
  <ScrollView>
    <PaddedView>
      <Item
        reference={genesis1.scripture.reference}
        html={genesis1.scripture.html}
        isLoading={false}
      />
    </PaddedView>
  </ScrollView>
));

stories.add('Psalm 23', () => (
  <ScrollView>
    <PaddedView>
      <Item
        reference={psalm23.scripture.reference}
        html={psalm23.scripture.html}
        isLoading={false}
      />
    </PaddedView>
  </ScrollView>
));

stories.add('Song of Solomon 1:1-4', () => (
  <ScrollView>
    <PaddedView>
      <Item
        reference={songOfSolomon1.scripture.reference}
        html={songOfSolomon1.scripture.html}
        isLoading={false}
      />
    </PaddedView>
  </ScrollView>
));

stories.add('John 3:16-17', () => (
  <ScrollView>
    <PaddedView>
      <Item
        reference={john3.scripture.reference}
        html={john3.scripture.html}
        isLoading={false}
      />
    </PaddedView>
  </ScrollView>
));

stories.add('Revelation 22:20-21', () => (
  <ScrollView>
    <PaddedView>
      <Item
        reference={revelation22.scripture.reference}
        html={revelation22.scripture.html}
        isLoading={false}
      />
    </PaddedView>
  </ScrollView>
));
