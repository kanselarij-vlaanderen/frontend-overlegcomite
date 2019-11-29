import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default Route.extend(AuthenticatedRouteMixin, DataTableRouteMixin, {
  modelName: 'user',

  mergeQueryOptions(params) {
    return {
      include: 'group',
      filter: {
        'last-name': params.filter || undefined
      }
    };
  },

  setupController(controller) {
    controller.set('filterText', this.paramsFor('user-management').filter || '');
  },

  actions: {
    refresh() {
      this._super(...arguments);
      this.refresh();
    }
  }
});
