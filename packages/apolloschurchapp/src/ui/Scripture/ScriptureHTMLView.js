import React from 'react';
import { withProps } from 'recompose';
import { Text } from 'react-native';

import HTMLView from 'apolloschurchapp/src/ui/HTMLView';
import defaultRenderer, {
  wrapTextChildren,
} from 'apolloschurchapp/src/ui/HTMLView/defaultRenderer';
import Paragraph from 'apolloschurchapp/src/ui/typography/Paragraph';
import { H4, H6, BodyText } from 'apolloschurchapp/src/ui/typography';
import styled from 'apolloschurchapp/src/ui/styled';

const RedLetters = styled(({ theme }) => ({
  color: theme.colors.wordOfChrist,
}))(Text);

const NumText = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
  lineHeight: theme.helpers.verticalRhythm(1, 1.625),
}))(H6);

const HeavyText = styled(({ theme }) => ({
  lineHeight: theme.helpers.verticalRhythm(2),
}))(H4);

const renderer = (node, { children, ...other }) => {
  // the defaultRenderer support several basic elements out of the box,
  // this function only needs to handle the cases that are unique to scripture.
  const className = (node && node.attribs && node.attribs.class) || '';

  if (className.includes('v')) {
    /* TODO: a single space lives here to temporarily space verse numbers when they are not at the
     * beginning of a sentence or paragraph. It affects all instences (albeit less noticably in
     * somecases) so a more procise fix in the future is prefered.
     */
    return <NumText> {children} </NumText>;
  }

  if (className.includes('sp') || className.includes('d')) {
    return <HeavyText>{children}</HeavyText>;
  }

  if (className.includes('q1')) {
    return <BodyText>{children}</BodyText>;
  }

  if (className.includes('q2')) {
    return (
      <BodyText>
        {'     '}
        {children}
      </BodyText>
    );
  }

  if (className.includes('wj')) {
    return <RedLetters>{children}</RedLetters>;
  }

  if (node.name === 'p') {
    return (
      <Paragraph>
        <BodyText>{wrapTextChildren(children)}</BodyText>
      </Paragraph>
    );
  }

  return defaultRenderer(node, { children, ...other });
};

const ScriptureHTMLView = withProps({
  renderer,
})(HTMLView);

export default ScriptureHTMLView;
