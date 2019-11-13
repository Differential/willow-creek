import bugsnag from '@bugsnag/js';
import Config from '@apollosproject/config';

const bugsnagClient = bugsnag({
  apiKey: process.env.BUGSNAG_API_KEY,
  releaseStage: process.env.RELEASE_STATE || 'development',
});

export const report = (error, metaData, beforeSend) => {
  bugsnagClient.notify(error, {
    metaData: {
      Rock: { rockUrl: Config.ROCK.API_URL },
      ...metaData,
    },
    beforeSend,
  });
};
