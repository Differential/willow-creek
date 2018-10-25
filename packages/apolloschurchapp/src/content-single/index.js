import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { ErrorCard } from 'apolloschurchapp/src/ui/Card';
import { ThemeMixin } from 'apolloschurchapp/src/ui/theme';

import ModalView from 'apolloschurchapp/src/ui/ModalView';
import TrackEventWhenLoaded from 'apolloschurchapp/src/analytics/TrackEventWhenLoaded';

import { events } from 'apolloschurchapp/src/analytics';
import ActionContainer from './ActionContainer';
import getContentItem from './getContentItem';

import DevotionalContentItem from './DevotionalContentItem';
import UniversalContentItem from './UniversalContentItem';

class ContentSingle extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      push: PropTypes.func,
    }),
  };

  static navigationOptions = {
    header: null,
  };

  get itemId() {
    return this.props.navigation.getParam('itemId', []);
  }

  get queryVariables() {
    return { itemId: this.itemId };
  }

  renderContent = ({ content, loading, error }) => {
    let { __typename } = content;
    if (!__typename && this.itemId) {
      [__typename] = this.itemId.split(':');
    }
    switch (__typename) {
      case 'DevotionalContentItem':
        return (
          <DevotionalContentItem
            id={this.itemId}
            content={content}
            loading={loading}
            error={error}
          />
        );
      case 'UniversalContentItem':
      default:
        return (
          <UniversalContentItem
            id={this.itemId}
            content={content}
            loading={loading}
            error={error}
          />
        );
    }
  };

  renderWithData = ({ loading, error, data }) => {
    if (error) return <ErrorCard error={error} />;

    const content = data.node || {};

    const { theme = {}, id } = content;

    return (
      <ThemeMixin
        mixin={{
          type: get(theme, 'type', 'light').toLowerCase(),
          colors: get(theme, 'colors'),
        }}
      >
        <ModalView>
          <TrackEventWhenLoaded
            loaded={!!(!loading && content.title)}
            eventName={events.ViewContent}
            properties={{
              title: content.title,
              itemId: this.itemId,
            }}
          />
          {this.renderContent({ content, loading, error })}
          <ActionContainer itemId={id} />
        </ModalView>
      </ThemeMixin>
    );
  };

  render() {
    return (
      <Query query={getContentItem} variables={this.queryVariables}>
        {this.renderWithData}
      </Query>
    );
  }
}

export default ContentSingle;
