import { alias } from '@ember/object/computed';
import { inject as controller } from '@ember/controller';
import AgendaItemEditController from 'frontend-overlegcomite/controllers/agendaitems/agendaitem/edit';
import { action } from "@ember/object";

export default class NewAgendaitemsController extends AgendaItemEditController {
  @controller('agendaitems') parentController;

  @alias('model.meeting') meeting;

  constructor() {
    super(...arguments);
    const governmentBodies = this.store.query('government-body', {
      sort: '-name',
      filter: { 'deprecated': false }
    });
    this.set('governmentBodies', governmentBodies);
  }

  @action
  async save() {
    this.set('isLoading', true);
    await this.saveCase();

    this.model.save().then((agendaItem) => {
      // this.parentController.get('model').save().then(() => {
      //   this.parentController.send('updateModel');
        this.transitionToRoute('agendaitems.agendaitem', agendaItem);
      // }).catch(() => {
      //   // TODO: Handle error
      // }).finally(() => {
      //   this.set('isLoading', false);
      // });
    }).catch(() => {
      // TODO: Handle error
    }).finally(() => {
      this.set('isLoading', false);
    });
  }

  @action
  async didCancel() { // Used by parent controller class
    history.back();
  }
}
