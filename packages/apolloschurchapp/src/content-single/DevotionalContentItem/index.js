import React, { PureComponent } from 'react';
import { SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { ErrorCard } from 'apolloschurchapp/src/ui/Card';
import TabView, { SceneMap } from 'apolloschurchapp/src/ui/TabView';
import BackgroundView from 'apolloschurchapp/src/ui/BackgroundView';
import styled from 'apolloschurchapp/src/ui/styled';
import ContentTab from './ContentTab';
import ScriptureTab from './ScriptureTab';

import getScripture from './getScripture';

const FlexedSafeAreaView = styled({ flex: 1 })(SafeAreaView);

/**
 * The devotional component.
 * Displays a TabView with two tabs: ContentTab and ScriptureTab.
 */
class DevotionalContentItem extends PureComponent {
  static propTypes = {
    /** The id of the devotional item */
    id: PropTypes.string.isRequired,
    content: PropTypes.shape({
      /** The devotional title */
      title: PropTypes.string,
    }),
    /** Toggles placeholders */
    loading: PropTypes.bool,
    navigation: PropTypes.shape({}),
  };

  /**
   * Function to get the scripture references from the larger scripture object.
   * Props: full scripture array of objects
   * Returns: an array of scripture references.
   */
  getScriptureReferences = (scripture) => {
    if (scripture && scripture.length) {
      return scripture.map((ref) => ref.reference);
    }
    return null;
  };

  /**
   * The route that TabView uses to render the ContentTab.
   * Note: navigationState gets passed down automatically from the TabView.
   */
  contentRoute = ({ scriptures, loading }) => (navigationState) => (
    <ContentTab
      id={this.props.id}
      references={this.getScriptureReferences(scriptures)}
      title={this.props.content.title}
      navigationState={navigationState}
      navigation={this.props.navigation}
      isLoading={this.props.loading || loading}
    />
  );

  /**
   * The route that TabView uses to render the ScriptureTab
   */
  scriptureRoute = ({ scriptures, loading }) => () => (
    <ScriptureTab
      id={this.props.id}
      scripture={scriptures}
      navigation={this.props.navigation}
      isLoading={this.props.loading || loading}
    />
  );

  renderTabs = ({
    data: { node: { scriptures = [] } = {} } = {},
    error,
    loading,
  }) => {
    if (error) return <ErrorCard error={error} />;
    const hasScripture = loading || scriptures.length;
    const tabRoutes = [{ title: 'Devotional', key: 'content' }];
    if (hasScripture) tabRoutes.push({ title: 'Scripture', key: 'scripture' });
    return (
      <TabView
        routes={tabRoutes}
        renderScene={SceneMap({
          content: this.contentRoute({ scriptures, loading }),
          scripture: this.scriptureRoute({ scriptures, loading }),
        })}
      />
    );
  };

  render() {
    return (
      <BackgroundView>
        <FlexedSafeAreaView>
          <Query query={getScripture} variables={{ itemId: this.props.id }}>
            {this.renderTabs}
          </Query>
        </FlexedSafeAreaView>
      </BackgroundView>
    );
  }
}

export default DevotionalContentItem;
