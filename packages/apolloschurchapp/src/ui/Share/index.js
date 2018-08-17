import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import Icon from 'apolloschurchapp/src/ui/Icon';
import Touchable from 'apolloschurchapp/src/ui/Touchable';
import share from 'apolloschurchapp/src/utils/content/share';
import { withTheme } from 'apolloschurchapp/src/ui/theme';

const enhance = compose(pure, withTheme());

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
