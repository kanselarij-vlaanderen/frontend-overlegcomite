import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import ENV from 'frontend-overlegcomite/config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('agendaitems', { path: '/vergaderingen/:meeting_id/agendapunten' }, function() {
    this.route('agendaitem', { path: '/:agendaitem_id' }, function() {
      this.route('index', { path: '/' });
      this.route('edit', { path: '/wijzig' });
      this.route('delete', { path: '/verwijder' });
    });
    this.route('new', { path: '/nieuw' });
  });
  this.route('meetings', { path: '/vergaderingen' }, function() {
    this.route('new', { path: '/nieuw' });
  });
  this.route('meeting', { path: '/vergaderingen/:meeting_id' }, function() {
    this.route('index', { path: '/' });
    this.route('documents', { path: '/documenten' });
  });
  this.route('cases', { path: '/dossiers' }, function() {
    this.route('case', { path: '/:id' }, function() {
      this.route('agendaitems', { path: '/agendapunten' });
    });
  });
  this.route('search', { path: 'agendapunten/zoeken' });

  if (ENV.APP.defaultLoginRouteName === 'mock-login') {
    this.route('mock-login');
  }
  this.route('login');

  this.route('route-not-found', {
    path: '/*wildcard'
  });
});

export default Router;
