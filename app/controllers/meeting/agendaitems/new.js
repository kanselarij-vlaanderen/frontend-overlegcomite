import Controller from '@ember/controller';
import { service } from "@ember/service";
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { getRequestState } from '@warp-drive/ember';
import { createAgendaitem } from '../../../data/agendaitem/builders';
import { createCase } from '../../../data/case/builders';

export default class MeetingAgendaitemsNewController extends Controller {
  @service store;
  @service router;

  @tracked saveState;

  @action
  async saveAgendaitem() {
    const caseIdentifier = this.model.case.get('identifier');
    const saveRequest = this.store.request(createAgendaitem(this.model));
    this.saveState = getRequestState(saveRequest);
    const { content } = await saveRequest;
    const agendaitem = content.data;
    const caseSaveRequest = this.store.request(createCase(this.store.createRecord('case', {
      identifier: caseIdentifier,
      agendaItems: [agendaitem],
    })));
    this.saveState = getRequestState(caseSaveRequest);
    await caseSaveRequest;
    // We need to add empty query params to prevent the router from looking for
    // queryParams in meeting, which would trigger a trap in the proxy object.
    this.router.transitionTo('meeting.agendaitem', agendaitem, { queryParams: {}});
  }
}
