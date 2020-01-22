import ApollosConfig from '@apollosproject/config';

export function setupUniversalLinks({ app }) {
  const {
    APPLE_TEAM_ID,
    APPLE_APP_ID,
    GOOGLE_APP_ID,
    GOOGLE_KEYSTORE_SHA256,
    PLAY_STORE_LINK,
    APP_STORE_LINK,
  } = ApollosConfig.UNIVERSAL_LINKS;

  app.get('/.well-known/apple-app-site-association', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(
      JSON.stringify({
        applinks: {
          apps: [],
          details: [
            {
              appID: [APPLE_TEAM_ID, APPLE_APP_ID].join('.'),
              paths: ['/apollos/*'],
            },
          ],
        },
      })
    );
  });

  app.get('/.well-known/assetlinks.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(
      JSON.stringify([
        {
          relation: ['delegate_permission/common.handle_all_urls'],
          target: {
            namespace: 'android_app',
            package_name: GOOGLE_APP_ID,
            sha256_cert_fingerprints: [GOOGLE_KEYSTORE_SHA256],
          },
        },
      ])
    );
  });

  app.get('/app-link/*', (req, res) => {
    if (/Android/.test(req.headers['user-agent'])) {
      res.redirect(PLAY_STORE_LINK);
    } else {
      res.redirect(APP_STORE_LINK);
    }
  });
}
