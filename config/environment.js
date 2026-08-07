'use strict';

module.exports = function(environment) {
  const ENV = {
    modulePrefix: 'frontend-overlegcomite',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },
    acmidm: {
      clientId: '{{OAUTH_CLIENT_ID}}',
      authUrl: '{{OAUTH_BASE_URL}}',
      authRedirectUrl: '{{OAUTH_REDIRECT_URL}}',
      logoutUrl: '{{OAUTH_LOGOUT_URL}}',
      scope: [
        'vo',
        'profile',
        'openid',
        'dkboverlegcomite'
      ].join(' '),
    },
    plausible: {
      domain: '{{ANALYTICS_APP_DOMAIN}}',
      apiHost: '{{ANALYTICS_API_HOST}}',
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.acmidm.clientId = 'b882fde4-56e4-4423-be1a-6b424ea6f7b1';
    ENV.acmidm.authUrl = 'https://authenticatie-ti.vlaanderen.be/op/v1/auth';
    ENV.acmidm.authRedirectUrl = 'https://overlegcomite-dev.vlaanderen.be/authorization/callback';
    ENV.acmidm.logoutUrl = 'https://authenticatie-ti.vlaanderen.be/op/v1/logout';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
