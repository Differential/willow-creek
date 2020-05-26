import bugsnag from '@bugsnag/js';
import { RESTDataSource } from 'apollo-datasource-rest';

const bugsnagClient = bugsnag({
  apiKey: process.env.BUGSNAG_API_KEY,
  releaseStage: process.env.RELEASE_STAGE || 'development',
});

export const report = (error, metaData, beforeSend) => {
  bugsnagClient.notify(error, {
    metaData: {
      Rock: { rockUrl: 'https://rock.willowcreek.org/api' },
      ...metaData,
    },
    beforeSend,
  });
};

const originaldidReceiveResponse = RESTDataSource.prototype.didReceiveResponse;

RESTDataSource.prototype.didReceiveResponse = function(response, _request) {
  if (response.status === 401) {
    report(new Error('401 in RESTDataSource'), {
      metaData: {
        Response: {
          status: response.status,
          statusText: response.statusText,
          body: response.body,
        },
        Request: _request,
      },
    });
  }
  return originaldidReceiveResponse.call(this, response, _request);
};
