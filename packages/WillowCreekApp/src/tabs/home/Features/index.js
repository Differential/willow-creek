import React from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import { styled, H3, H6 } from '@apollosproject/ui-kit';
import Browser from '../../../ui/WebBrowser';
import ActionListCard from '../../../ui/ActionListCard';

import GET_FEED_FEATURES from './getFeedFeatures';

const StyledH6 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

// const handleOnPressActionItem = (id) =>
//   this.props.navigation.navigate('ContentSingle', {
//     itemId: id,
//     transitionKey: 2,
//   });

const Features = ({ navigation, refetchRef }) => (
  <Query query={GET_FEED_FEATURES} fetchPolicy="cache-and-network">
    {({ data: features, loading, refetch }) => {
      refetchRef(refetch);
      return loading ? (
        <ActionListCard
          isLoading
          header={
            <>
              <StyledH6 isLoading />
              <H3 isLoading />
            </>
          }
          actions={[
            {
              id: 'fakeId1',
              title: '',
              subtitle: '',
              parentChannel: {
                id: '',
                name: '',
              },
              coverImage: {
                sources: {
                  uri: '',
                },
              },
            },
            {
              id: 'fakeId2',
              title: '',
              subtitle: '',
              parentChannel: {
                id: '',
                name: '',
              },
              coverImage: {
                sources: {
                  uri: '',
                },
              },
            },
            {
              id: 'fakeId3',
              title: '',
              subtitle: '',
              parentChannel: {
                id: '',
                name: '',
              },
              coverImage: {
                sources: {
                  uri: '',
                },
              },
            },
            {
              id: 'fakeId4',
              title: '',
              subtitle: '',
              parentChannel: {
                id: '',
                name: '',
              },
              coverImage: {
                sources: {
                  uri: '',
                },
              },
            },
          ]}
        />
      ) : (
        get(features, 'userFeedFeatures', []).map(
          ({ title, subtitle, actions, id, additionalAction }) =>
            actions.length ? (
              <ActionListCard
                isLoading={loading}
                key={id}
                header={
                  <>
                    <StyledH6 numberOfLines={1}>{title}</StyledH6>
                    <H3 numberOfLines={3}>{subtitle}</H3>
                  </>
                }
                actions={actions}
                onPressActionItem={({ action, relatedNode }) => {
                  if (action === 'READ_CONTENT') {
                    navigation.navigate('ContentSingle', {
                      itemId: relatedNode.id,
                      transitionKey: 2,
                    });
                  }
                  if (action === 'READ_EVENT') {
                    navigation.navigate('Event', {
                      eventId: relatedNode.id,
                      transitionKey: 2,
                    });
                  }
                  if (action === 'OPEN_URL') {
                    Browser.open(relatedNode.url);
                  }
                }}
                onPressActionListButton={
                  additionalAction
                    ? () => navigation.navigate('EventFeed') // TODO: Wire this up to use the same functionality that onPressActionItem uses
                    : null
                }
              />
            ) : null
        )
      );
    }}
  </Query>
);

Features.displayName = 'Features';

export default Features;
