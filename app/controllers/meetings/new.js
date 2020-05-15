import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { action } from "@ember/object";

export default class NewMeetings extends Controller {
  @controller('meetings') parentController;
  isLoading = false;

  get dateForPicker () { // TODO imported datepicker only supports list of dates fro arg 'date'
    return [this.model.startedAt];
  }

  @action
  setMeetingDate(startedAt) {
    // startedAt = moment(startedAt).toDate();
    this.set('model.startedAt', startedAt);
    // const modified = moment().toDate();
    // this.set('model.modified', modified);
  }

  @action
  save() {
    this.set('isLoading', true);
    this.model
      .save()
      .catch(() => {
        // TODO: Handle error
      })
      .finally(() => {
        this.set('isLoading', false);
        this.parentController.send('updateModel');
        this.transitionToRoute('meetings.index');
      });
  }

  @action
  cancel() {
    this.transitionToRoute('meetings.index');
  }
}
