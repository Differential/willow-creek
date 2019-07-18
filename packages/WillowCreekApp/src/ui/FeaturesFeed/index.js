import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { H6, H3 } from '@apollosproject/ui-kit';

import ContentTableCard from '../ContentTableCard';
import GET_FEED_FEATURES from './getFeedFeatures';

const PersonaFeed = ({ onPressItem }) => (
  <Query query={GET_FEED_FEATURES} fetchPolicy="cache-and-network">
    {({ data: features, loading: featuresLoading }) =>
      get(features, 'userFeedFeatures', []).map(
        ({ title, subtitle, actions, id }) => (
          <ContentTableCard
            isLoading={featuresLoading}
            onPress={onPressItem}
            key={id}
            header={
              <>
                <H6 isLoading={featuresLoading}>{title}</H6>
                <H3
                  isLoading={featuresLoading}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {subtitle}
                </H3>
              </>
            }
            content={actions}
          />
        )
      )
    }
  </Query>
);

PersonaFeed.propTypes = {
  onPressItem: PropTypes.func.isRequired,
};

export default PersonaFeed;
