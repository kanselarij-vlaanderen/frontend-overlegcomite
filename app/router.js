import EmberRouter from '@ember/routing/router';
import config from 'frontend-overlegcomite/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('meetings', {
    path: 'vergaderingen',
  });

  // TODO nest under meetings route and move current meetings route to meetings.index
  // This will fix the highlight of the active tab in the main header
  this.route('meeting', { path: 'vergaderingen/:meeting_id' }, function() {
    this.route('agendaitems', { path: '/agendapunten' }, function() {
      this.route('agendaitem', { path: '/:agendaitem_id' });
    });
    this.route('documents', { path: '/documenten' });
  });
  this.route('view-document', { path: '/documenten/:document_id/versies/:version_number/bekijken'});
  this.route('error', { path: 'fout/*path'});
});
