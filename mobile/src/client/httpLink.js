import { createHttpLink } from 'apollo-link-http';
import { APP_DATA_URL } from 'react-native-dotenv';

export default createHttpLink({ uri: APP_DATA_URL });
