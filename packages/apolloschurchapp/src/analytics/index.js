import gql from 'graphql-tag';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

import { client } from '../client';

const anonymousId = DeviceInfo.getUniqueID();

const deviceInfo = {
  platform: Platform.OS === 'ios' ? 'iOS' : 'Android',
  deviceId: anonymousId,
  deviceModel: DeviceInfo.getModel(),
  osVersion: DeviceInfo.getSystemVersion(),
  appVersion: DeviceInfo.getVersion(),
};

const trackMutation = gql`
  mutation track($input: AnalyticsTrackInput!) {
    trackEvent(input: $input) {
      success
    }
  }
`;

const identifyMutation = gql`
  mutation identify($input: AnalyticsIdentifyInput!) {
    identifySelf(input: $input) {
      success
    }
  }
`;

const propertiesToGqlInput = (props = []) =>
  Object.keys(props).map((key) => ({
    field: key,
    value: props[key],
  }));

export const track = ({ eventName, properties }) =>
  client.mutate({
    mutation: trackMutation,
    variables: {
      input: {
        anonymousId,
        deviceInfo,
        eventName,
        properties: propertiesToGqlInput(properties),
      },
    },
  });

export const identify = () =>
  client.mutate({
    mutation: identifyMutation,
    variables: {
      input: {
        anonymousId,
        deviceInfo,
      },
    },
  });
