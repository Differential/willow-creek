import amplitude from 'amplitude-js';
import Config from 'react-native-config';

amplitude.getInstance().init(Config.AMPLITUDE_KEY, null, {
  useNativeDeviceInfo: true,
});

export const track = ({ eventName, properties = null }) => {
  amplitude.getInstance().logEvent(eventName, properties);
};
