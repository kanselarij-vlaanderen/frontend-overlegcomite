import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';
import saveCaseIdentifier from '../../../utils/save-case-identifier';
import { caseIdentifierValid } from '../../../utils/case-identifier-validation';

export default class MeetingAgendaitemsAgendaitemController extends Controller {
  @service store;
  @service router;

  get formValid() {
    return caseIdentifierValid(this.caseIdentifier);
  }

  @tracked _caseIdentifier;

  get caseIdentifier() {
    if (this._caseIdentifier !== undefined) {
      return this._caseIdentifier;
    } else {
      this.model.case.then((case_) => {
        this._caseIdentifier = case_.identifier;
      });
      return '';
    }
  }
  set caseIdentifier(newIdentifier) {
    this._caseIdentifier = newIdentifier;
  }

  @tracked isOpenEditAgendaitemModal = false;
  openEditAgendaitemModal = () => this.isOpenEditAgendaitemModal = true;
  closeEditAgendaitemModal = () => this.isOpenEditAgendaitemModal = false;

  @tracked isOpenDeleteAgendaitemModal = false;
  openDeleteAgendaitemModal = () => this.isOpenDeleteAgendaitemModal = true;
  closeDeleteAgendaitemModal = () => this.isOpenDeleteAgendaitemModal = false;

  saveAgendaitem = task(async () => {
    await saveCaseIdentifier(this.store, this.model, this.caseIdentifier);
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    await this.model.save();
    // force rerun of the meeting.agendaitems model hook to update grouping of agendaitems
    this.router.refresh('meeting.agendaitems');
    this.closeEditAgendaitemModal();
  });

  cancelEditAgendaitem = async () => {
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
