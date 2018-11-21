import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import {
  ContentCard,
  ErrorCard,
  styled,
  withTheme,
} from '@apollosproject/ui-kit';
import getContentCard from './query';

export query from './query';

const StyledContentCard = styled({
  width: Dimensions.get('window').width * 0.85,
  aspectRatio: 0.85,
})(ContentCard);

const FeaturedContentCardConnected = ({
  contentId,
  isLoading,
  tile,
  theme,
  ...otherProps
}) => {
  if (!contentId || isLoading)
    return <StyledContentCard {...otherProps} isLoading />;

  return (
    <Query query={getContentCard} variables={{ contentId, tile: !!tile }}>
      {({ data: { node = {} } = {}, loading, error }) => {
        if (error) return <ErrorCard error={error} />;

        const coverImage = get(node, 'coverImage.sources', undefined);

        return (
          <StyledContentCard
            {...node}
            {...otherProps}
            coverImage={coverImage}
            isLoading={loading}
          />
        );
      }}
    </Query>
  );
};

FeaturedContentCardConnected.propTypes = {
  isLoading: PropTypes.bool,
  contentId: PropTypes.string,
  tile: PropTypes.bool,
};

export default withTheme()(FeaturedContentCardConnected);
