import { PermissionsAndroid } from 'react-native';

export default async () =>
  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );
