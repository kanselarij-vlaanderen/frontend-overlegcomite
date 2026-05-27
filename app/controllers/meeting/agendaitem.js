import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { deleteRecord } from '@warp-drive/utilities/json-api';
import { getRequestState } from '@warp-drive/ember';

export default class MeetingAgendaitemController extends Controller {
  @service store;
  @service router;

  @tracked deleteState;
  @action
  async deleteAgendaitem() {
    if (this.model.case?.content) {
      const caseRequest = this.store.request(deleteRecord(this.model.case.content))
      this.deleteState = getRequestState(caseRequest);
      await caseRequest;
    }

    const request = this.store.request(deleteRecord(this.model))
    this.deleteState = getRequestState(request);
    await request;

    this.router.transitionTo("meeting");
  }
}
