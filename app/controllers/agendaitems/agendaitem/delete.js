import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';


export default Controller.extend({
  parentController: controller('agendaitems'),

  isLoading: false,

  actions: {
    save() {
      this.set('isLoading', true);
      const indexOfCurrent = this.get('model.meeting.sortedAgendaItems').indexOf(this.get('model'));
      const neighbouringItem = this.get('model.meeting.sortedAgendaItems').objectAt(indexOfCurrent - 1) ||
        this.get('model.meeting.sortedAgendaItems').objectAt(indexOfCurrent + 1);
      this.get('model').save()
        .then(() => {
          if (neighbouringItem) {
            this.transitionToRoute('agendaitems.agendaitem', neighbouringItem);
          } else {
            this.transitionToRoute('agendaitems');
          }
        })
        .catch(() => {
          // TODO: Handle error
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },

    cancel() {
      this.get('model').rollbackAttributes();
      this.transitionToRoute('agendaitems.agendaitem.index', this.get('model'));
    },
  }
});
