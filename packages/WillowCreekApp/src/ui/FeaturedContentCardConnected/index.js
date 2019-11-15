import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import {
  PaddedView,
  ErrorCard,
  styled,
  withTheme,
  Icon,
  H3,
  H6,
  ContentCard,
} from '@apollosproject/ui-kit';
import LikeButton from '../LikeButton';
import getContentCard from './query';

export query from './query';

const StyledContentCard = styled({
  width: Dimensions.get('window').width * 0.85,
})(ContentCard);

const CardActions = styled(({ theme: { sizing: { baseUnit } } }) => ({
  padding: baseUnit * 1.5,
}))(View);

const CardFooter = styled({
  position: 'absolute',
  top: 0,
  right: 0,
})(CardActions);

const CardIcon = styled(({ theme }) => ({
  width: theme.sizing.baseUnit * 2,
  height: theme.sizing.baseUnit * 2,
  borderRadius: theme.sizing.baseUnit,
  overflow: 'hidden',
  backgroundColor: theme.colors.primary,
  marginLeft: theme.sizing.baseUnit,
  marginTop: -theme.sizing.baseUnit,
  marginBottom: theme.sizing.baseUnit - 6,
  alignItems: 'center',
  justifyContent: 'center',
}))((props) => (
  <View {...props}>
    <Icon name="play" size={16} />
  </View>
));

const FeaturedContentCardConnected = ({
  contentId,
  isLoading,
  tile,
  ...otherProps
}) => {
  const cardTheme = { type: 'dark', colors: { paper: theme.colors.secondary } };

  if (!contentId || isLoading)
    return <StyledContentCard {...otherProps} isLoading forceRatio={1} />;

  return (
    <Query query={getContentCard} variables={{ contentId, tile: !!tile }}>
      {({ data: { node = {} } = {}, loading, error }) => {
        if (error) return <ErrorCard error={error} />;

        const coverImage = get(node, 'coverImage.sources', undefined);

        return (
          <StyledContentCard
            {...node}
            {...otherProps}
            content={
              <>
                <CardIcon />
                <PaddedView vertical={false}>
                  <H3 ellipsizeMode="tail" numberOfLines={1}>
                    {node.title}
                  </H3>
                  <H6 ellipsizeMode="tail" numberOfLines={2}>
                    {node.summary}
                  </H6>
                </PaddedView>
              </>
            }
            footer={
              <CardFooter floating>
                <LikeButton itemId={node.id} />
              </CardFooter>
            }
            fixedSize
            coverImage={coverImage}
            isLoading={loading}
            theme={cardTheme}
            forceRatio={1}
            tile
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
