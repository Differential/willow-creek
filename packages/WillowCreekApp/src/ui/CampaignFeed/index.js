import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { TouchableScale, FeaturedCard } from '@apollosproject/ui-kit';

import GET_GROW_CAMPAIGN_CONTENT_ITEM from './getGrowCampaignContentItem';
import GET_MY_WILLOW_CAMPAIGN_CONTENT_ITEM from './getMyWillowCampaignContentItem';

const queryMap = {
  myWillowCampaign: GET_MY_WILLOW_CAMPAIGN_CONTENT_ITEM,
  growCampaign: GET_GROW_CAMPAIGN_CONTENT_ITEM,
};

const ConnectedFeaturedCard = ({ title, summary, coverImage, isLoading }) => (
  <FeaturedCard
    title={title}
    image={coverImage && coverImage.sources}
    isLoading={isLoading}
    description={summary}
    hasAction
  />
);

const CampaignFeed = ({ onPressItem, type }) => (
  <Query query={queryMap[type]} fetchPolicy="cache-and-network">
    {({ data: featuredData, loading: isFeaturedLoading }) => {
      const featuredContent = get(featuredData, `${type}.edges`, []).map(
        (edge) => edge.node
      );
      const featuredItem = featuredContent[0];

      console.log(featuredItem);

      if (!featuredItem || (!featuredItem.id && !isFeaturedLoading))
        return null;

      return (
        <TouchableScale onPress={() => onPressItem({ id: featuredItem.id })}>
          <ConnectedFeaturedCard
            {...featuredItem}
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
