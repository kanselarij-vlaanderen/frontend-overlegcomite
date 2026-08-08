import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';
import { caseIdentifierValid } from '../../../../utils/case-identifier-validation';
import ensureCaseWithIdentifier from '../../../../utils/ensure-case-with-identifier';

export default class MeetingsMeetingAgendaitemsAgendaitemController extends Controller {
  @service store;
  @service router;

  get formValid() {
    return caseIdentifierValid(this.caseIdentifier);
  }

  @tracked caseIdentifier;

  @tracked isOpenEditAgendaitemModal = false;
  openEditAgendaitemModal = () => this.isOpenEditAgendaitemModal = true;
  closeEditAgendaitemModal = () => this.isOpenEditAgendaitemModal = false;

  @tracked isOpenDeleteAgendaitemModal = false;
  openDeleteAgendaitemModal = () => this.isOpenDeleteAgendaitemModal = true;
  closeDeleteAgendaitemModal = () => this.isOpenDeleteAgendaitemModal = false;

  saveAgendaitem = task(async () => {
    // Check if we have any existing case data in the store already. ensureCase
    // will reuse it if available and with the correct identifier, otherwise
    // ensureCase will fetch the correct case from the backend anyway.
    const oldCase = this.model.case.id && this.store.peekRecord('case', this.model.case.id)
    const newCase = await ensureCaseWithIdentifier(this.store, oldCase, this.caseIdentifier);
    this.model.case = newCase;
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    await this.model.save();
    // force rerun of the meetings.meeting.agendaitems model hook to update grouping of agendaitems
    this.router.refresh('meetings.meeting.agendaitems');
    this.closeEditAgendaitemModal();
  });

  cancelEditAgendaitem = async () => {
    this.caseIdentifier = (await this.model.case).identifier
    this.model.rollbackAttributes();
    this.model.hasMany('submitters').reload();
    this.closeEditAgendaitemModal();
  }

  deleteAgendaitem = task(async () => {
    const meeting = await this.model.meeting;
    const case_ = await this.model.case;
    const agendaitemsOnCase = await case_.agendaItems;
    if (agendaitemsOnCase.length == 1) {
      // eslint-disable-next-line warp-drive/no-legacy-request-patterns
      await case_.destroyRecord();
    }
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    await this.model.destroyRecord();
    this.closeDeleteAgendaitemModal();
    // force rerun of the meetings.meeting.agendaitems model hook to update list of agendaitems
    this.router.refresh('meetings.meeting.agendaitems');
    this.router.transitionTo('meetings.meeting.agendaitems.index', meeting.id);
  });
}
