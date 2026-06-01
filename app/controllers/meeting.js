import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { getRequestState } from '@warp-drive/ember';
import { deleteRecord } from '@warp-drive/utilities/json-api';

export default class MeetingController extends Controller {
  @service store;
  @service router;

  @tracked isOpenNewAgendaitemModal = false;

  @tracked deleteModalOpen = false;
  openDeleteModal = () => this.deleteModalOpen = true
  closeDeleteModal = () => this.deleteModalOpen = false

  @tracked deleteState;

  @action
  openNewAgendaitemModal() {
    this.isOpenNewAgendaitemModal = true;
  }

  @action
  closeNewAgendaitemModal() {
    this.isOpenNewAgendaitemModal = false;
  }

  @action
  async saveNewAgendaitem(agendaitem, case_) {

  }

  @action
  async deleteMeeting() {
    this.store.deleteRecord(this.model);
    const deleteRequest = this.store.request(deleteRecord(this.model))
    this.deleteState = getRequestState(deleteRequest)
    await deleteRequest;
    this.deleteModalOpen = false;
    this.router.transitionTo('meetings');
  }

  routeIsActive = (routeName) => {
    return this.router.isActive(routeName);
  }
}
