import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { TouchableScale } from '@apollosproject/ui-kit';

import ContentCardConnected from '../ContentCardConnected';
import GET_CAMPAIGN_CONTENT_ITEM from './getCampaignContentItem';

const CampaignFeed = ({ onItemPress }) => (
  <Query query={GET_CAMPAIGN_CONTENT_ITEM} fetchPolicy="cache-and-network">
    {({ data: featuredData, loading: isFeaturedLoading }) => {
      const featuredContent = get(featuredData, 'campaigns.edges', []).map(
        (edge) => edge.node
      );

      const featuredItem = get(
        featuredContent[0],
        'childContentItemsConnection.edges[0].node',
        {}
      );

      if (!featuredItem.id && !isFeaturedLoading) return null;
      return (
        <TouchableScale onPress={() => onItemPress({ id: featuredItem.id })}>
          <ContentCardConnected
            contentId={featuredItem.id}
            isLoading={isFeaturedLoading}
          />
        </TouchableScale>
      );
    }}
  </Query>
);

CampaignFeed.propTypes = {
  onItemPress: PropTypes.func.isRequired,
};

export default CampaignFeed;
