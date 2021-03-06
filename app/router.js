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
      this.route('edit', { path: '/wijzigen' });
      this.route('delete', { path: '/verwijderen' });
    });
    this.route('new', { path: '/nieuw' });
  });
  this.route('meetings', { path: '/vergaderingen' }, function() {
    this.route('new', { path: '/nieuw' });
  });
  this.route('meeting', { path: '/vergaderingen/:meeting_id' }, function() {
    this.route('index', { path: '/' });
    this.route('edit', { path: '/wijzigen' });
    this.route('delete', { path: '/verwijderen' });
    this.route('documents', { path: '/documenten' });
  });
  this.route('search', { path: 'agendapunten/zoeken' }, function() {
    this.route('index', { path: '/' });
  });
  this.route('view-document', { path: '/documenten/:document_id/versies/:version_number/bekijken' });
  this.route('user-management', { path: '/instellingen/gebruikersbeheer' }, function() {
    this.route('new-user', { path: '/nieuwe-gebruiker' });
  });

  if (ENV.APP.enableMockLogin) {
    this.route('mock-login');
  }
  this.route('rightless-user', { path: '/geen-gebruikersrechten' });
  this.route('login', { path: '/aanmelden' });

  this.route('route-not-found', {
    path: '/*wildcard'
  });
});

export default Router;
