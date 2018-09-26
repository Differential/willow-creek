import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { track } from './index';

export default class TrackEventWhenLoaded extends PureComponent {
  componentDidMount() {
    if (this.props.loaded) {
      this.track();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.loaded && this.props.loaded) {
      this.track();
    }
  }

  get trackClient() {
    return this.props.track || track;
  }

  track() {
    const { eventName, properties } = this.props;
    return this.trackClient({ eventName, properties });
  }

  render() {
    return null;
  }
}

TrackEventWhenLoaded.propTypes = {
  loaded: PropTypes.bool.isRequired,
  eventName: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  properties: PropTypes.any,
  track: PropTypes.func,
};
