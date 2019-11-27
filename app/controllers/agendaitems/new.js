import { alias } from '@ember/object/computed';
import { inject as controller } from '@ember/controller';
import AgendaItemEditController from 'frontend-overlegcomite/controllers/agendaitems/agendaitem/edit';

export default AgendaItemEditController.extend({
  parentController: controller('agendaitems'),

  meeting: alias("model.meeting"),

  init() {
    this._super(...arguments);
    const governmentBodies = this.store.query('government-body', {
      sort: '-name',
      filter: { 'deprecated': false }
    }).then((governmentBodies) => {
      return governmentBodies.toArray(); // ember-power-select 4.0.0-beta.3 only supports POJ Arrays, see https://github.com/cibernox/ember-power-select/issues/1296
    });
    this.set('governmentBodies', governmentBodies);
  },

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
      history.back()
    }
  }
});
