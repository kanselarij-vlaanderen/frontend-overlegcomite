import Controller from '@ember/controller';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';

export default class UserManagementNewUserController extends Controller {
  @(task(function * (model) {
    yield this.addIdentifier(); // see "addIdentifier" doc

    const account = yield this.model.get('account');
    const identifier = yield this.model.get('identifier');
    yield identifier.save();
    yield account.save();
    yield model.save();

    this.didSave();
  })) saveModel;

  didSave () {
    this.send('reloadModel'); // 'user-management' route
    this.transitionToRoute('user-management');
  }

  async addIdentifier() {
    /* VO-id is stored as a direct property on account, as well as a property of
     * an "identifier"-object, which is related to a user. Below we generate the "identifier"-object,
     * based on the VO-id which has been set on the account  */
    const account = await this.model.get('account');
    const identifier = this.store.createRecord('identifier', {
      notation: account.voId
    });
    return this.model.set('identifier', identifier);
  }

  @action
  async cancel () {
    (await this.model.get('account')).rollbackAttributes();
    this.model.rollbackAttributes();
    this.transitionToRoute('user-management');
  }
}
