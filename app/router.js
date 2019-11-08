import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import ENV from 'frontend-overlegcomite/config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('cases');
  this.route('meetings');
  if (ENV.environment === 'development') {
    this.route('mock-login');
  }
  this.route('login');

  this.route('route-not-found', {
    path: '/*wildcard'
  });
});

export default Router;
