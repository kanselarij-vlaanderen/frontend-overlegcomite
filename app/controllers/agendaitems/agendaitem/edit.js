import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  governmentBodies: null,

  isLoading: false,

  async saveCase() {
    if (this.get('model.case.hasDirtyAttributes')) {
        const _case = await this.get('model.case');
        return _case.save();
    } else {
      return Promise.resolve(this.get('model.case'));
    }
  },

  actions: {
    async save() {
      this.set('isLoading', true);
      await this.saveCase();
      this.get('model').save().then((agendaItem) => {
        // this.parentController.send('updateModel');
        this.transitionToRoute('agendaitems.agendaitem', agendaItem);
      }).catch(() => {
        // TODO: Handle error
      }).finally(() => {
        this.set('isLoading', false);
      });
    },

    cancel() {
      if (this.get('case.isNew') || this.get('case.hasDirtyAttributes')) {
        this.get('case').rollbackAttributes();
      }
      this.get('model').rollbackAttributes();
      this.transitionToRoute('agendaitems.agendaitem', this.get('model'));
    }
  }
});
