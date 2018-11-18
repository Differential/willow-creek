import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import share from 'WillowCreekApp/src/utils/content/share';
import { Touchable, Icon, withTheme } from '@apollosproject/ui-kit';

const enhance = compose(
  pure,
  withTheme()
);

const Share = enhance(({ content, theme }) => (
  <Touchable onPress={() => share(content)}>
    <Icon name={'share'} fill={theme.colors.secondary} />
  </Touchable>
));

Share.propTypes = {
  content: PropTypes.shape({
    message: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default Share;
