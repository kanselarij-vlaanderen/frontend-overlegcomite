import Route from '@ember/routing/route';
import { ACCOUNT_PROVIDER_URI } from 'frontend-overlegcomite/config/config';

export default class UserManagementNewUserRoute extends Route {
  model () {
    const account = this.store.createRecord('account');
    account.set('provider', ACCOUNT_PROVIDER_URI);
    const user = this.store.createRecord('user');
    user.set('account', account);
    return user;
  }
}
