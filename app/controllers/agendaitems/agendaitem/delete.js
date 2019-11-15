import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';


export default Controller.extend({
  parentController: controller('agendaitems'),

  isLoading: false,

  actions: {
    save() {
      this.set('isLoading', true);
      this.get('model')
        .save()
        .catch((error) => {
          // Handle error
        })
        .finally(() => {
          this.set('isLoading', false);
          // this.parentController.send('updateModel');
          this.transitionToRoute('agendaitems.agendaitem');
        });
    },

    cancel() {
      this.get('model').rollbackAttributes();
      this.transitionToRoute('agendaitems.agendaitem.index', this.get('model'));
    },
  }
});
