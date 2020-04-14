import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class UserFormComponent extends Component {
  @service store;

  constructor() {
    super(...arguments);
    this.accountGroups = this.store.findAll('account-group');
  }

  @action
  setAccountGroup(group) {
    this.args.user.set('group', group);
  }
}
