import React from 'react';
import { Query } from 'react-apollo';
import { ScrollView } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { ErrorCard } from 'ui/Card';
import GradientOverlayImage from 'ui/GradientOverlayImage';
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
    }),
  };

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', []);
    return (
      <Query query={GET_CONTENT} variables={{ itemId }}>
        {({ loading, error, data }) => {
          // if (loading) return null;
          if (error) return <ErrorCard error={error} />;

          return (
            <ScrollView>
              <GradientOverlayImage
                source={get(data, 'node.coverImage.sources', {})}
                isLoading={loading}
              />
              <PaddedView>
                <H3 isLoading={loading}>{get(data, 'node.title', '')}</H3>
                <HTMLView isLoading={loading}>
                  {get(data, 'node.htmlContent', '')}
                </HTMLView>
              </PaddedView>
            </ScrollView>
          );
        }}
      </Query>
    );
  }
}

export default ContentSingle;
