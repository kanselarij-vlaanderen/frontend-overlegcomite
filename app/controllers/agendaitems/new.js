import { inject as controller } from '@ember/controller';
import AgendaItemEditController from 'frontend-overlegcomite/controllers/agendaitems/agendaitem/edit';

export default AgendaItemEditController.extend({
  parentController: controller('agendaitems'),

  actions: {
    async save() {
      this.set('isLoading', true);
      await this.saveCase();
      this.get('model').save().then((agendaItem) => {
        this.parentController.get('model').save().then(() => {
          this.parentController.send('updateModel');
          this.transitionToRoute('agendaitems.agendaitem', agendaItem);
        }).catch(() => {
          // TODO: Handle error
        }).finally(() => {
          this.set('isLoading', false);
        });
      }).catch(() => {
        // TODO: Handle error
        this.set('isLoading', false);
      })
    },

    cancel() {
      if (this.get('case.isNew') || this.get('case.hasDirtyAttributes')) {
        this.get('case').rollbackAttributes();
      }
      this.get('model').rollbackAttributes();
      this.parentController.send('updateModel');
      this.transitionToRoute('agendaitems.agendaitem', this.get('model'));
    }
  }
});
