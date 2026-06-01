import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class MeetingAgendaitemsAgendaitemController extends Controller {
  @service store;
  @service router;

  @tracked case;

  @tracked isOpenEditAgendaitemModal = false;
  openEditAgendaitemModal = () => this.isOpenEditAgendaitemModal = true;
  closeEditAgendaitemModal = () => this.isOpenEditAgendaitemModal = false;

  @tracked isOpenDeleteAgendaitemModal = false;
  openDeleteAgendaitemModal = () => this.isOpenDeleteAgendaitemModal = true;
  closeDeleteAgendaitemModal = () => this.isOpenDeleteAgendaitemModal = false;

  saveAgendaitem = task(async () => {
    const case_ = await this.model.case;
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    await case_.save();
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    await this.model.save();
    this.closeEditAgendaitemModal();
  });

  cancelEditAgendaitem = async () => {
    const case_ = await this.model.case;
    case_.rollbackAttributes();
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
    this.router.transitionTo('meeting.agendaitems.index', meeting.id);
  });
}
