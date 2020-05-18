import Controller from "@ember/controller";
import DefaultQueryParamsMixin from "ember-data-table/mixins/default-query-params"; // eslint-disable-line ember/no-mixins
import { tracked } from '@glimmer/tracking';
import { set, action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UserManagementController extends Controller.extend(DefaultQueryParamsMixin) {
  @service store;
  sort = 'last-name';
  @tracked name = null;
  @tracked group = null;
  queryParams = {
    page: {}
  };

  constructor() {
    super(...arguments);
    const userGroups = this.store.findAll('account-group');
    set(this, 'userGroups', userGroups);
  }

  get groupFilter () {
    return this.userGroups.findBy('id', this.group);
  }

  @action
  filterByName() {
    set(this, 'page', 0);
    set(this, 'name', this.filterText);
  }

  @action
  filterByGroup(group) {
    set(this, 'page', 0);
    set(this, 'group', group ? group.id : null);
  }

  @action
  changeGroup(user, group) {
    user.set('group', group);
    user.save().then(() => {
      // TODO: report success
    }).catch(() => {
      // TODO: report error while updating
    });
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
