import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class MeetingController extends Controller {
  @service currentSession;
  @alias('model') meeting;

  @action
  updateModel() {
    this.model.update();
  }
}
