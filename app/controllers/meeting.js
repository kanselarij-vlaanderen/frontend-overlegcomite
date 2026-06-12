import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class MeetingController extends Controller {
  @service store;
  @service router;

  @tracked agendaDistribution;
  @tracked notificationsDistribution;

  @tracked isOpenEditMeetingModal = false;
  openEditMeetingModal = () => (this.isOpenEditMeetingModal = true);
  closeEditMeetingModal = () => (this.isOpenEditMeetingModal = false);

  @tracked isOpenDeleteMeetingModal = false;
  openDeleteMeetingModal = () => (this.isOpenDeleteMeetingModal = true);
  closeDeleteMeetingModal = () => (this.isOpenDeleteMeetingModal = false);

  @tracked isOpenNewAgendaitemModal = false;
  @tracked newAgendaitem;
  @tracked newCase;

  openNewAgendaitemModal = () => (this.isOpenNewAgendaitemModal = true);
  closeNewAgendaitemModal = () => (this.isOpenNewAgendaitemModal = false);

  saveMeeting = task(async () => {
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    await this.model.save();
    this.closeEditMeetingModal();
  });

  cancelEditMeeting = () => {
    this.model.rollbackAttributes();
    this.closeEditMeetingModal();
  };

  deleteMeeting = task(async () => {
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    await this.model.destroyRecord();
    this.closeDeleteMeetingModal();
    this.router.transitionTo('meetings');
  });

  async runDistribution(distribution) {
    await distribution.runDistribution();
  }

  goToAgendaitem = (agendaitem) => {
    this.closeNewAgendaitemModal();
    // force rerun of the meeting.agendaitems model hook to update list of agendaitems
    this.router.refresh('meeting.agendaitems');
    this.router.transitionTo(
      'meeting.agendaitems.agendaitem',
      this.model.id,
      agendaitem.id,
    );
  };

  routeIsActive = (routeName) => {
    return this.router.isActive(routeName);
  };
}
