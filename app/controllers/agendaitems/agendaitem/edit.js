import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from "@ember/object";

export default class EditAgendaitemsAgendaitemController extends Controller {
  @service store;

  governmentBodies = null;

  isLoading = false;

  async saveCase() {
    if (this.model.case.get('hasDirtyAttributes')) {
        const _case = await this.model.case;
        return _case.save();
    } else {
      return Promise.resolve(this.model.case);
    }
  }

  @action
  async save() {
    this.set('isLoading', true);
    await this.saveCase();
    this.model.save().then((agendaItem) => {
      // this.parentController.send('updateModel');
      this.transitionToRoute('agendaitems.agendaitem', agendaItem);
    }).catch(() => {
      // TODO: Handle error
    }).finally(() => {
      this.set('isLoading', false);
    });
  }

  @action
  async cancel() {
    const _case = await this.model.case;
    if (_case && _case.get('isNew')) {
      const _case = await this.model.case;
      _case.rollbackAttributes(); // Removes the non-commited case again
    }
    this.model.belongsTo('case').reload();
    this.model.rollbackAttributes();
    this.didCancel();
  }

  @action
  didCancel() {
    this.transitionToRoute('agendaitems.agendaitem', this.model.id);
  }
}
