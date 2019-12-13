'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'frontend-overlegcomite',
    environment,
    rootURL: '/',
    locationType: 'auto',

    moment: {
      includeLocales: ['nl-be'],
      includeTimezone: 'subset'
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      defaultLoginRouteName: 'login'
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.APP.defaultLoginRouteName = 'mock-login';
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
    ENV['torii'] = {
      disableRedirectInitializer: true,
      providers: {
        'acmidm-oauth2': {
          scope: [
            'openid',
            'vo', // for 'vo_id'
            // 'rrn', // not allowed
            'profile', // ?
            'dkboverlegcomite', // ?
            'dkbkaleidos' // for 'dkb_kaleidos_rol_3d'
          ].join(' ')
        }
      }
    };

    if (!process.env.DEPLOY_ENV) {
      ENV.APP.defaultLoginRouteName = 'mock-login';

      ENV['torii']['providers']['acmidm-oauth2']['apiKey'] = 'b882fde4-56e4-4423-be1a-6b424ea6f7b1';
      ENV['torii']['providers']['acmidm-oauth2']['baseUrl'] = 'https://authenticatie-ti.vlaanderen.be/op/v1/auth';
      ENV['torii']['providers']['acmidm-oauth2']['redirectUri'] = 'https://overlegcomite-dev.vlaanderen.be/authorization/callback';
      ENV['torii']['providers']['acmidm-oauth2']['logoutUrl'] = 'https://authenticatie-ti.vlaanderen.be/op/v1/logout';
    }

    if (process.env.DEPLOY_ENV === 'test') {
      ENV['torii']['providers']['acmidm-oauth2']['apiKey'] = 'caa9d378-e882-4530-9564-0f9ac2c3d4d3';
      ENV['torii']['providers']['acmidm-oauth2']['baseUrl'] = 'https://authenticatie-ti.vlaanderen.be/op/v1/auth';
      ENV['torii']['providers']['acmidm-oauth2']['redirectUri'] = 'https://overlegcomite-test.vlaanderen.be/authorization/callback';
      ENV['torii']['providers']['acmidm-oauth2']['logoutUrl'] = 'https://authenticatie-ti.vlaanderen.be/op/v1/logout';
    }

    if (process.env.DEPLOY_ENV === 'production') {
      ENV['torii']['providers']['acmidm-oauth2']['apiKey'] = 'c6eea3a7-7dd1-4ac6-a533-d1eb6b503592';
      ENV['torii']['providers']['acmidm-oauth2']['baseUrl'] = 'https://authenticatie.vlaanderen.be/op/v1/auth';
      ENV['torii']['providers']['acmidm-oauth2']['redirectUri'] = 'https://overlegcomite.vlaanderen.be/authorization/callback';
      ENV['torii']['providers']['acmidm-oauth2']['logoutUrl'] = 'https://authenticatie.vlaanderen.be/op/v1/logout';
    }
  }

  return ENV;
};
