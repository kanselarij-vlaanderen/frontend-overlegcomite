import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import ENV from 'frontend-overlegcomite/config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('cases');
  this.route('agendaitems', { path: '/vergaderingen/:meeting_id/agendapunten' }, function() {
    this.route('agendaitem', { path: '/:agendaitem_id' }, function() {
      this.route('index', { path: '/' });
    });
  });
  this.route('meetings', { path: '/vergaderingen' }, function() {
    this.route('new', { path: '/nieuw' });
  });
  if (ENV.APP.defaultLoginRouteName === 'mock-login') {
    this.route('mock-login');
  }
  this.route('login');

  this.route('route-not-found', {
    path: '/*wildcard'
  });
});

export default Router;
