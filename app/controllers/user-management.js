import Controller from "@ember/controller";
import DefaultQueryParamsMixin from "ember-data-table/mixins/default-query-params";
import { set, get, action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UserManagementController extends Controller.extend(DefaultQueryParamsMixin) {
  @service store;
  sort = 'last-name';
  queryParams = {
    filter: {
      refreshModel: true
    },
    page: {}
  };
  filter = '';

  constructor() {
    super(...arguments);
    const userGroups = this.store.findAll('account-group');
    set(this, 'userGroups', userGroups);
  }

  @action
  filterModel() {
    set(this, 'page', 0);
    set(this, 'filter', get(this, 'filterText'));
  }

  @action
  changeGroup(user, group) {
    user.set('group', group);
    user.save().then(() => {
      // TODO: report success
    }).catch(() => {
      // TODO: report error while updating
    })
  }

  @action
  async deleteUser(user) {
    try {
      await (await user.get('account')).destroyRecord();
      await (await user.get('identifier')).destroyRecord();
      return user.destroyRecord();
    }
    catch (error) {
      // TODO: report error while deleting. Probably we rather want to handle this delete in the backend, for it to be 1 transaction
    }
  }
}
