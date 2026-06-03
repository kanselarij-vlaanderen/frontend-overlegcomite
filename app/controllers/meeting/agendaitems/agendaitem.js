import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';
import { caseIdentifierValid } from '../../../utils/case-identifier-validation';
import ensureCaseWithIdentifier from '../../../utils/ensure-case-with-identifier';

export default class MeetingAgendaitemsAgendaitemController extends Controller {
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
    const oldCase = this.model.case.id && this.store.peekRecord('case', this.model.case.id)
    const newCase = await ensureCaseWithIdentifier(this.store, oldCase, this.caseIdentifier);
    this.model.case = newCase;
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    await this.model.save();
    // force rerun of the meeting.agendaitems model hook to update grouping of agendaitems
    this.router.refresh('meeting.agendaitems');
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
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    await this.model.destroyRecord();
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    await case_.destroyRecord();
    this.closeDeleteAgendaitemModal();
    // force rerun of the meeting.agendaitems model hook to update list of agendaitems
    this.router.refresh('meeting.agendaitems');
    this.router.transitionTo('meeting.agendaitems.index', meeting.id);
  });
}
