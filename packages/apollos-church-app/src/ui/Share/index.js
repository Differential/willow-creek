import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import Icon from '/mobile/ui/Icon';
import Touchable from '/mobile/ui/Touchable';
import share from '/mobile/utils/content/share';
import { withTheme } from '/mobile/ui/theme';

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
