import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { TouchableScale } from '@apollosproject/ui-kit';

import ContentCardConnected from '../ContentCardConnected';
import GET_GROW_CAMPAIGN_CONTENT_ITEM from './getGrowCampaignContentItem';
import GET_MY_WILLOW_CAMPAIGN_CONTENT_ITEM from './getMyWillowCampaignContentItem';

const queryMap = {
  myWillowCampaign: GET_MY_WILLOW_CAMPAIGN_CONTENT_ITEM,
  growCampaign: GET_GROW_CAMPAIGN_CONTENT_ITEM,
};

const CampaignFeed = ({ onPressItem, type }) => (
  <Query query={queryMap[type]} fetchPolicy="cache-and-network">
    {({ data: featuredData, loading: isFeaturedLoading }) => {
      const featuredContent = get(featuredData, `${type}.edges`, []).map(
        (edge) => edge.node
      );
      const featuredItem = featuredContent[0];

      if (!featuredItem || (!featuredItem.id && !isFeaturedLoading))
        return null;

      return (
        <TouchableScale onPress={() => onPressItem({ id: featuredItem.id })}>
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
  onPressItem: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['myWillowCampaign', 'growCampaign']).isRequired,
};

export default CampaignFeed;
