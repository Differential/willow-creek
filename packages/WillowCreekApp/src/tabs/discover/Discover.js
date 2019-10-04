import React, { PureComponent } from 'react';
import { StatusBar } from 'react-native';
import { throttle } from 'lodash';

import { BackgroundView } from '@apollosproject/ui-kit';

import SearchInputHeader, {
  ReactNavigationStyleReset,
} from '../../ui/SearchInputHeader';

import SearchFeed from './SearchFeed';
import DiscoverFeed from './DiscoverFeed';

class Discover extends PureComponent {
  state = {
    searchText: '',
    isFocused: false,
  };

  handleOnChangeText = throttle(
    (value) =>
      this.setState({
        searchText: value,
      }),
    300
  );

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  handleOnFocus = (inputState) => {
    this.setState({
      isFocused: inputState,
    });
  };

  render() {
    return (
      <BackgroundView>
        <SearchInputHeader
          onChangeText={this.handleOnChangeText}
          onFocus={this.handleOnFocus}
        />
        {this.state.isFocused || this.state.searchText ? (
          <SearchFeed searchText={this.state.searchText} />
        ) : (
          <DiscoverFeed />
        )}
      </BackgroundView>
    );
  }
}

Discover.navigationOptions = {
  title: 'Discover',
  headerStyle: ReactNavigationStyleReset.header,
};

export default Discover;
