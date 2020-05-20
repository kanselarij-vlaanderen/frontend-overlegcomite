import Controller from '@ember/controller';
import { action } from "@ember/object";

export default class EditMeeting extends Controller {
  isLoading = false;

  @action
  async save() {
    this.set('isLoading', true);
    await this.model.save();
    this.set('isLoading', false);
    this.didSave();
  }

  @action
  async didSave() {
    history.back();
  }

  @action
  cancel() {
    this.model.rollbackAttributes();
    history.back();
  }
}
