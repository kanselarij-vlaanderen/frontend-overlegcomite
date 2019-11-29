import Controller from "@ember/controller";
import DefaultQueryParamsMixin from "ember-data-table/mixins/default-query-params";

export default Controller.extend(DefaultQueryParamsMixin, {
  sort: 'last-name',
  queryParams: {
    filter: {
      refreshModel: true
    }
  },
  filter: '',

  init() {
    this._super(...arguments);
    const userGroups = this.store.findAll('account-group');
    this.set('userGroups', userGroups);
  },

  actions: {
    filterModel() {
      this.set('filter', this.get('filterText'));
    },

    changeGroup(user, group) {
      // TODO
    }
  }
});
