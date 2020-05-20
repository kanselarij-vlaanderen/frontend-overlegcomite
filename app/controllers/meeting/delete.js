import Controller from '@ember/controller';
import { action } from "@ember/object";
import { task } from 'ember-concurrency';

export default class DeleteMeeting extends Controller {

  @task(function* (meeting) {
    const agendaItems = yield meeting.get('agendaItems');
    for (const item of agendaItems.toArray()) {
      yield item.destroyRecord(); // Could be done in parallel if backend permits
    }
    yield this.model.destroyRecord();
  }) deleteMeeting;

  @action
  async save() {
    await this.deleteMeeting.perform(this.model);
    this.didSave();
  }

  @action
  async didSave() {
    this.transitionToRoute('meetings');
  }

  @action
  cancel() {
    history.back();
  }
}
