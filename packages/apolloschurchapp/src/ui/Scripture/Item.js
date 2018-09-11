import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Placeholder from 'rn-placeholder';

import { H4, H6 } from 'apolloschurchapp/src/ui/typography';

import ScriptureHTMLView from './ScriptureHTMLView';

const Item = ({ reference, html, isLoading }) => (
  <View>
    <H4>
      <H4>{reference}</H4> <H6>WEB</H6>
    </H4>
    <Placeholder.Paragraph
      lineNumber={5}
      onReady={!isLoading}
      lastLineWidth="60%"
      firstLineWidth="40%"
    >
      <ScriptureHTMLView>{html}</ScriptureHTMLView>
    </Placeholder.Paragraph>
  </View>
);

Item.propTypes = {
  reference: PropTypes.string,
  html: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Item;
