import { Platform } from 'react-native';
import { createUploadLink } from 'apollo-upload-client';
import { APP_DATA_URL, ANDROID_URL } from 'react-native-dotenv';

let uri = APP_DATA_URL;
const androidUri = ANDROID_URL || '10.0.2.2';

// Android's emulator requires localhost network traffic to go through 10.0.2.2
if (Platform.OS === 'android') uri = uri.replace('localhost', androidUri);

export default createUploadLink({ uri });
