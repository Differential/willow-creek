import React from 'react';

import PropTypes from 'prop-types';

import Share from 'apolloschurchapp/src/ui/Share';

import SideBySideView from 'apolloschurchapp/src/ui/SideBySideView';
import LikeButton from 'apolloschurchapp/src/ui/LikeButton';

const ActionContainer = ({ content, itemId }) => (
  <SideBySideView>
    <LikeButton itemId={itemId} />
    <Share content={content} />
  </SideBySideView>
);

ActionContainer.propTypes = {
  content: PropTypes.shape({}),
  itemId: PropTypes.string,
};

export default ActionContainer;
