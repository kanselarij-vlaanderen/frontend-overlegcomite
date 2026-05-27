import EmberRouter from '@ember/routing/router';
import config from 'frontend-overlegcomite/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('meetings', {
    path: 'vergaderingen',
  }, function() {
    this.route('new', {
      path: '/nieuw'
    });
  });

  this.route('meeting', {
    path: 'vergaderingen/:meeting_id'
  }, function() {
    this.route('edit', { path: "/wijzigen" });
    this.route('agendaitems', {
      path: '/agendapunten'
    }, function() {
      this.route('new', { path: '/nieuw' });
    });
    this.route('agendaitem', {
      path: '/agendapunt/:agendaitem_id'
    });
  });
});
