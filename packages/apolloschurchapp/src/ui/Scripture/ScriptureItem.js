import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Placeholder from 'apolloschurchapp/src/ui/Placeholder';
import { H4, H6 } from 'apolloschurchapp/src/ui/typography';

import { LegalText } from './typography';
import ScriptureHTMLView from './ScriptureHTMLView';

const ScriptureItem = ({ reference, html, copyright, isLoading }) => (
  <Placeholder.Paragraph
    lineNumber={5}
    onReady={!isLoading}
    lastLineWidth="60%"
    firstLineWidth="40%"
  >
    <View>
      <H4>
        <H4>{reference}</H4> <H6>WEB</H6>
      </H4>
      <ScriptureHTMLView>{html}</ScriptureHTMLView>
      <LegalText>{copyright === 'PUBLIC DOMAIN' ? '' : copyright}</LegalText>
    </View>
  </Placeholder.Paragraph>
);

ScriptureItem.propTypes = {
  reference: PropTypes.string,
  html: PropTypes.string,
  copyright: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default ScriptureItem;
