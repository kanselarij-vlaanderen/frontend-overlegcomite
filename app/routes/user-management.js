import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import DataTableRouteMixin from 'ember-data-table/mixins/route';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, DataTableRouteMixin, {
  currentSession: service(),
  modelName: 'user',

  beforeModel() {
    if (!this.currentSession.canAccessSettings) {
      this.transitionTo('meetings.index');
    }
  },

  mergeQueryOptions(params) {
    return {
      include: 'account,group',
      filter: {
        'last-name': params.filter || undefined
      }
    };
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('filterText', this.paramsFor('user-management').filter || '');
  },

  actions: {
    refresh() {
      this._super(...arguments);
      this.refresh();
    }
  }
});
