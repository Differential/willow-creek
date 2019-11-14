import { Client } from 'bugsnag-react-native';
import Config from 'react-native-config';

const bugsnag = new Client(Config.BUGSNAG_API_KEY);

export default bugsnag;
