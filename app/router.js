import EmberRouter from '@ember/routing/router';
import config from 'frontend-overlegcomite/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('mock-login');
  this.route('login', { path: '/aanmelden' });
  this.route('auth', { path: '/authorization' }, function () {
    this.route('login-redirect');
    this.route('login');
    this.route('callback');
    this.route('logout');
  });

  this.route('meetings', { path: 'vergaderingen' }, function () {
  });

  // TODO nest under meetings route and move current meetings route to meetings.index
  // This will fix the highlight of the active tab in the main header
  this.route('meeting', { path: 'vergaderingen/:meeting_id' }, function() {
    this.route('agendaitems', { path: '/agendapunten' }, function() {
      this.route('agendaitem', { path: '/:agendaitem_id' });
    });
    this.route('documents', { path: '/documenten' });
  });

  this.route('documents', { path: '/documenten' }, function() {
    this.route('document', { path: '/:document_id' }, function() {
      this.route('versions', { path: '/versies' }, function() {
        this.route('version', { path: '/:version_number/bekijken' })
      });
    });
  });
  this.route('document-versions', { path: '/document-versies/' }, function() {
    this.route('document-version', { path: '/:document_version_id' })
  });

  this.route('search', { path: '/zoeken' });

  this.route('error', { path: 'fout/*path'});
});
