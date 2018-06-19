import PropTypes from 'prop-types';
import { compose, mapProps, getContext, hoistStatics } from 'recompose';

import { THEME_PROPS } from './createTheme';

const DEFAULT_MAPPER_FN = ({ theme } = {}) => ({ theme });

export default function(mapperFn = DEFAULT_MAPPER_FN) {
  return hoistStatics(
    compose(
      getContext({
        theme: PropTypes.shape(THEME_PROPS),
      }),
      mapProps(({ theme, ...otherProps }) => ({
        ...otherProps,
        ...mapperFn({ theme, ...otherProps }),
      }))
    )
  );
}
