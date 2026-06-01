import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class MeetingsController extends Controller {
  @service store;
  @service router;

  @tracked sort = '-started-at';
  @tracked page = 0;
  @tracked size = 20;

  @tracked isOpenNewMeetingModal = false;
  @tracked newMeeting;

  openNewMeetingModal = () => {
    this.isOpenNewMeetingModal = true;
    this.newMeeting = this.store.createRecord('meeting', {
      startedAt: Temporal.Now.zonedDateTimeISO()
        .round('hour')
        .with({ hour: 10 })
    });
  }

  closeNewMeetingModal = () => {
    this.isOpenNewMeetingModal = false;
    this.newMeeting = null;
  }

  saveNewMeeting = task(async () => {
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    const meeting = await this.newMeeting.save();
    this.closeNewMeetingModal();
    this.goToMeeting(meeting);
  });

  goToMeeting = (meeting) => {
    this.router.transitionTo('meeting', meeting.id);
  }
}
