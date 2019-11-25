import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';



export default Controller.extend({
  parentController: controller('meetings'),
  isLoading: false,

  dateForPicker: computed('model.startedAt', function () { // TODO imported datepicker only supports list of dates fro arg 'date'
    return [this.model.startedAt];
  }),

  actions: {
    setMeetingDate(startedAt) {
      // startedAt = moment(startedAt).toDate();
      this.set('model.startedAt', startedAt);
      // const modified = moment().toDate();
      // this.set('model.modified', modified);
    },

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
    },

    cancel() {
      this.transitionToRoute('meetings.index');
    },
  },
});
