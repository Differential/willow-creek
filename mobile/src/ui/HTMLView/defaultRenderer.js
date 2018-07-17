import React, { Children } from 'react';
import { Text, Linking } from 'react-native';
import { decodeHTML } from 'entities';

import {
  BodyText,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Paragraph,
  BlockQuote,
  BulletListItem,
} from 'ui/typography';
import { ButtonLink } from 'ui/Button';
import ConnectedImage from 'ui/ConnectedImage';

const LINE_BREAK = '\n';
const TEXT_TYPES_THAT_SHOULD_WRAP = [Text, BodyText, ButtonLink];

const wrapTextChildren = (children, Component = BodyText) => {
  const newChildren = [];
  let currentTextChildren = [];
  Children.toArray(children).forEach((child, i) => {
    if (TEXT_TYPES_THAT_SHOULD_WRAP.includes(child.type)) {
      currentTextChildren.push(child);
    } else {
      if (currentTextChildren.length) {
        newChildren.push(
          // eslint-disable-next-line
          <Component key={`composed-children-${i}`}>
            {currentTextChildren}
          </Component>
        );
        currentTextChildren = [];
      }
      newChildren.push(child);
    }
  });
  if (currentTextChildren.length) {
    newChildren.push(
      <Component key="composed-children">{currentTextChildren}</Component>
    );
  }
  return newChildren;
};

const defaultRenderer = (node, { children }) => {
  if (node.type === 'text' && node.data && node.data.trim()) {
    const text = decodeHTML(node.data);
    if (!node.parent) {
      return (
        <Paragraph>
          <BodyText>{text}</BodyText>
        </Paragraph>
      );
    }
    return <Text>{text}</Text>;
  }

  switch (node.name) {
    case 'p':
      return <Paragraph>{wrapTextChildren(children)}</Paragraph>;
    case 'strong':
      return <BodyText bold>{children}</BodyText>;
    case 'em':
      return <BodyText italic>{children}</BodyText>;
    case 'blockquote':
      return <BlockQuote>{wrapTextChildren(children, Text)}</BlockQuote>;
    case 'h1':
      return <H1 padded>{wrapTextChildren(children, Text)}</H1>;
    case 'h2':
      return <H2 padded>{wrapTextChildren(children, Text)}</H2>;
    case 'h3':
      return <H3 padded>{wrapTextChildren(children, Text)}</H3>;
    case 'h4':
      return <H4 padded>{wrapTextChildren(children, Text)}</H4>;
    case 'h5':
      return <H5 padded>{wrapTextChildren(children, Text)}</H5>;
    case 'h6':
      return <H6 padded>{wrapTextChildren(children, Text)}</H6>;
    case 'ul':
      return <Paragraph>{children}</Paragraph>;
    case 'li':
      return <BulletListItem>{wrapTextChildren(children)}</BulletListItem>;
    case 'a': {
      let url = node.attribs && node.attribs.href;
      url = decodeHTML(url);

      if (url && url.startsWith('//')) {
        url = `http:${url}`;
      }
      if (!url.startsWith('http')) {
        // we can't currently handle non web-links, so just return regular text instead:
        return children;
      }
      const onPress = () => Linking.openURL(url);
      if (url) {
        return <ButtonLink onPress={onPress}>{children}</ButtonLink>;
      }
    }
    /* ignoring fallthrough on the next line because of the conditional return above,
     * so we handle the edge-case of an <a> tag used w/o a href
     */
    case 'img': {
      const source = {
        url: node.attribs.src,
      };

      const imgStyles = {
        resizeMode: 'contain',
        width: '100%',
      };

      return (
        <ConnectedImage maintainAspectRatio source={source} style={imgStyles} />
      );
    }
    case 'br':
      return <BodyText>{LINE_BREAK}</BodyText>;
    default:
      return children;
  }
};

export default defaultRenderer;
