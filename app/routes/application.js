import Route from '@ember/routing/route';
import { warn } from '@ember/debug';

import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject as service } from '@ember/service';

import ENV from 'frontend-overlegcomite/config/environment';

export default Route.extend(ApplicationRouteMixin, {
  currentSession: service(),
  moment: service(),

  beforeModel() {
    const moment = this.moment;
    moment.setLocale('nl-be');
    moment.setTimeZone('Europe/Brussels');
    moment.set('defaultFormat', 'DD-MM-YYYY, HH:mm');

    return this._loadCurrentSession();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentSession();
  },

  sessionInvalidated() {
    let logoutUrl;
    try {
      logoutUrl = ENV['torii']['providers']['acmidm-oauth2']['logoutUrl'];
    }
    catch {
      logoutUrl = ENV.rootURL;
      warn('Falling back to application rootURL as logoutUrl', { id: 'session-invalidation-url-warning' });
    }
    window.location.replace(logoutUrl);
  },

  _loadCurrentSession() {
    return this.currentSession.load().catch((e) => {
      warn(e, { id: 'session-load-failure' });
      this.session.invalidate();
    });
  }


});
