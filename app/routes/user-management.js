import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'frontend-overlegcomite/mixins/authenticated-route-mixin'; // eslint-disable-line ember/no-mixins
import DataTableRouteMixin from 'ember-data-table/mixins/route';
import { inject as service } from '@ember/service';
import { ACCOUNT_PROVIDER_URI } from 'frontend-overlegcomite/config/config';

export default Route.extend(AuthenticatedRouteMixin, DataTableRouteMixin, {
  currentSession: service(),
  modelName: 'user',

  queryParams: {
    name: {
      refreshModel: true
    },
    group: {
      refreshModel: true
    }
  },

  beforeModel() {
    if (!this.currentSession.canAccessSettings) {
      this.transitionTo('meetings.index');
    }
  },

  mergeQueryOptions(params) {
    return {
      include: 'account,group,organization',
      'filter[last-name]': params.name || undefined,
      'filter[group][:id:]': params.group || undefined,
      'filter[account][provider]': ACCOUNT_PROVIDER_URI
    };
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('filterText', this.paramsFor('user-management').name || '');
  },

  actions: {
    refresh() {
      this._super(...arguments);
      this.refresh();
    }
  }
});
