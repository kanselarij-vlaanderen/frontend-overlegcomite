import Controller from '@ember/controller';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';

export default class UserManagementNewUserController extends Controller {
  @(task(function * (model) {
    yield (yield model.get('account')).save();
    yield model.save();
    this.transitionToRoute('user-management');
  })) saveModel;

  @action
  async cancel () {
    (await this.model.get('account')).rollbackAttributes();
    this.model.rollbackAttributes();
    this.transitionToRoute('user-management');
  }
}
