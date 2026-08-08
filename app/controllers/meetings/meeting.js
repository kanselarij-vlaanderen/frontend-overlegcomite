import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class MeetingsMeetingController extends Controller {
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
    const agendaitems = await this.store.queryAll('agendaitem', {
      'filter[meeting][:uri:]': this.model.uri,
      include: 'case',
      sort: 'priority,sub-priority',
    });

    const cases = (
      await Promise.all(agendaitems.map((agendaitem) => agendaitem.case))
    ).filter((c) => c);

    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    await Promise.all(agendaitems.map((agendaitem) => agendaitem.destroyRecord()));
    for (const case_ of cases) {
      const agendaitemsOnCase = await case_.agendaItems;
      if (agendaitemsOnCase.length == 0) {
        // eslint-disable-next-line warp-drive/no-legacy-request-patterns
        await case_.destroyRecord();
      }
    }
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    await this.model.destroyRecord();
    this.closeDeleteMeetingModal();
    this.router.transitionTo('meetings.index');
  });

  async runDistribution(distribution) {
    await distribution.runDistribution();
  }

  goToAgendaitem = (agendaitem) => {
    this.closeNewAgendaitemModal();
    // force rerun of the meetings.meeting.agendaitems model hook to update list of agendaitems
    this.router.refresh('meetings.meeting.agendaitems');
    this.router.transitionTo(
      'meetings.meeting.agendaitems.agendaitem',
      this.model.id,
      agendaitem.id,
    );
  };

  routeIsActive = (routeName) => {
    return this.router.isActive(routeName);
  };
}
