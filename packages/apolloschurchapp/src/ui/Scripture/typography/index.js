import { Text } from 'react-native';

import styled from 'apolloschurchapp/src/ui/styled';

import ScriptureText from './ScriptureText';

const VerseNumber = styled(({ theme }) => ({
  fontSize: theme.helpers.rem(0.6),
  color: theme.colors.text.secondary,
}))(ScriptureText);

const RedLetters = styled(({ theme }) => ({
  color: theme.colors.wordOfChrist,
}))(Text);

const PoeticPause = styled({
  textAlign: 'right',
})(ScriptureText);

export { ScriptureText, VerseNumber, RedLetters, PoeticPause };
