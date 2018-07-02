import React from 'react';
import { Query } from 'react-apollo';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { ErrorCard } from 'ui/Card';
import CardTile from 'ui/CardTile';
import GradientOverlayImage from 'ui/GradientOverlayImage';
import HorizontalTileFeed from 'ui/HorizontalTileFeed';
import HTMLView from 'ui/HTMLView';
import PaddedView from 'ui/PaddedView';
import { H3 } from 'ui/typography';
import GET_CONTENT from './query';

class ContentSingle extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const itemTitle = navigation.getParam('itemTitle', 'Content');
    return {
      title: itemTitle,
    };
  };

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      push: PropTypes.func,
    }),
  };

  onPressItem = (item) =>
    this.props.navigation.push('ContentSingle', {
      itemId: item.node.id,
      itemTitle: item.node.title,
    });

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', []);
    const loadingStateObject = {
      node: {
        id: 'fakeId0',
        title: '',
        isLoading: true,
      },
    };
    return (
      <Query query={GET_CONTENT} variables={{ itemId }}>
        {({ loading, error, data }) => {
          // if (loading) return null;
          if (error) return <ErrorCard error={error} />;

          return (
            <ScrollView>
              <GradientOverlayImage
                source={get(data, 'node.coverImage.sources', [])}
                isLoading={loading}
              />
              <PaddedView>
                <H3 isLoading={loading}>{get(data, 'node.title', '')}</H3>
                <HTMLView isLoading={loading}>
                  {get(data, 'node.htmlContent', '')}
                </HTMLView>
              </PaddedView>
              <HorizontalTileFeed
                content={get(
                  data,
                  'node.childContentItemsConnection.edges',
                  []
                )}
                isLoading={loading}
                loadingStateObject={loadingStateObject}
                renderItem={({ item, index }) => (
                  <TouchableWithoutFeedback
                    onPress={() => this.onPressItem({ ...item })}
                  >
                    <CardTile
                      number={index + 1}
                      title={get(item, 'node.title', '')}
                      /*
                      * These are props that are not yet being passed in the data.
                      * We will need to make sure they get added back when that data is available.
                      * byLine={item.content.speaker}
                      * date={item.meta.date}
                      */
                      isLoading={item.isLoading}
                    />
                  </TouchableWithoutFeedback>
                )}
              />
            </ScrollView>
          );
        }}
      </Query>
    );
  }
}

export default ContentSingle;
