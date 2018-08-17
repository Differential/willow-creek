import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

const IOSTouchable = TouchableOpacity;

IOSTouchable.defaultProps = {
  activeOpacity: 0.5,
};

const Touchable =
  Platform.OS === 'android' ? TouchableNativeFeedback : IOSTouchable;

export default Touchable;
