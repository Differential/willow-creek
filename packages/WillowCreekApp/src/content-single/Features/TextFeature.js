import React from 'react';
import PropTypes from 'prop-types';

import { ActionCard, BodyText } from '@apollosproject/ui-kit';
import ShareContentButtonConnected from '../../ui/ShareContentButtonConnected';

const TextFeature = ({ body, sharing: { message } = {}, contentId }) => (
  <ActionCard
    action={
      <ShareContentButtonConnected message={message} itemId={contentId} />
    }
  >
    <BodyText>{body}</BodyText>
  </ActionCard>
);

TextFeature.propTypes = {
  body: PropTypes.string.isRequired,
  sharing: PropTypes.shape({ message: PropTypes.string }),
  contentId: PropTypes.string.isRequired,
};

export default TextFeature;
