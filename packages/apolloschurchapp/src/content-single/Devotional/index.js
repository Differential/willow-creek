import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TabView, { SceneMap } from 'apolloschurchapp/src/ui/TabView';
import BackgroundView from 'apolloschurchapp/src/ui/BackgroundView';
import ContentTab from './ContentTab';
import ScriptureTab from './ScriptureTab';

/**
 * The devotional component.
 * Displays a TabView with two tabs: ContentTab and ScriptureTab.
 */
class Devotional extends PureComponent {
  static propTypes = {
    /** The devotional text */
    body: PropTypes.string,
    /** The devotional title */
    title: PropTypes.string,
    /** Toggles placeholders */
    isLoading: PropTypes.bool,
    /** An array of scripture objects */
    scripture: PropTypes.arrayOf(
      PropTypes.shape({
        /** The ID of the verse (i.e. '1CO.15.57') */
        id: PropTypes.string,
        /** A human readable reference (i.e. '1 Corinthians 15:57') */
        reference: PropTypes.string,
        /** The scripture source to render */
        html: PropTypes.string,
      })
    ),
  };

  /**
   * Function to get the scripture references from the larger scripture object.
   * Props: full scripture array of objects
   * Returns: an array of scripture references.
   */
  getScriptureReferences = (scripture) => scripture.map((ref) => ref.reference);

  /**
   * The route that TabView uses to render the ContentTab.
   * Note: navigationState gets passed down automatically from the TabView.
   */
  contentRoute = (navigationState) => (
    <ContentTab
      body={this.props.body}
      isLoading={this.props.isLoading}
      references={this.getScriptureReferences(this.props.scripture)}
      title={this.props.title}
      navigationState={navigationState}
    />
  );

  /**
   * The route that TabView uses to render the ScriptureTab
   */
  scriptureRoute = () => (
    <ScriptureTab
      scripture={this.props.scripture}
      isLoading={this.props.isLoading}
    />
  );

  render() {
    const hasScripture = this.props.isLoading || this.props.scripture.length;
    const tabRoutes = [{ title: 'Devotional', key: 'content' }];
    if (hasScripture) tabRoutes.push({ title: 'Scripture', key: 'scripture' });

    return (
      <BackgroundView>
        <TabView
          routes={tabRoutes}
          renderScene={SceneMap({
            content: this.contentRoute,
            scripture: this.scriptureRoute,
          })}
        />
      </BackgroundView>
    );
  }
}

export default Devotional;
