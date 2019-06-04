import React from 'react';
import { Query } from 'react-apollo';
import { TouchableScale } from '@apollosproject/ui-kit';
import FeaturedContentCardConnected from 'WillowCreekApp/src/ui/FeaturedContentCardConnected';
import getCampaignContentItem from './getCampaignContentItem'
import { get } from 'lodash';

const FeaturedCampaign = () => (
  <Query
    query={getCampaignContentItem}
    fetchPolicy="cache-and-network"
  >
    {({ data: featuredData, loading: isFeaturedLoading }) => {
      const featuredContent = get(
        featuredData,
        'campaigns.edges',
        []
      ).map((edge) => edge.node);

      const featuredItem = get(
        featuredContent[0],
        'childContentItemsConnection.edges[0].node',
        {}
      );

      return (
        <TouchableScale
          onPress={() =>
            this.handleOnPress({ id: featuredItem.id })
          }
        >
          <FeaturedContentCardConnected
            contentId={featuredItem.id}
            isLoading={isFeaturedLoading}
          />
        </TouchableScale>
      );
    }}
  </Query>
)

export default FeaturedCampaign;