import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { action } from "@ember/object";

export default class DeleteAgendaitemsAgendaitemController extends Controller {
  @controller('agendaitems') parentController;

  isLoading = false;

  @action
  save() {
    this.set('isLoading', true);
    const sortedItems = this.model.meeting.get('sortedAgendaItems');
    const indexOfCurrent = sortedItems.indexOf(this.model);
    const neighbouringItem = sortedItems.objectAt(indexOfCurrent - 1) ||
      sortedItems.objectAt(indexOfCurrent + 1);
    this.model.save()
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
  }

  @action
  cancel() {
    this.model.rollbackAttributes();
    this.transitionToRoute('agendaitems.agendaitem.index', this.model);
  }
}
