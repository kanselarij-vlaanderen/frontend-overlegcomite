import Controller from '@ember/controller';
import { cached, tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { getPromiseState } from '@warp-drive/ember';
import createRecord from '../utils/warp-drive/create-record';

export default class MeetingsController extends Controller {
  @service store;
  @service router;

  @tracked sort = "-started-at";
  @tracked page = 0;
  @tracked size = 20;

  @tracked isOpenNewMeetingModal = false;
  @tracked newMeeting;
  @tracked savePromise;

  @cached
  get saveState() {
    return this.savePromise ? getPromiseState(this.savePromise) : null;
  }

  @action
  openNewMeetingModal() {
    this.isOpenNewMeetingModal = true;
    this.newMeeting = {
      startedAt: Temporal.Now.zonedDateTimeISO()
        .round('hour')
        .with({ hour: 8 })
    };
  }

  @action
  closeNewMeetingModal() {
    this.isOpenNewMeetingModal = false;
    this.newMeeting = null;
  }

  @action
  async saveNewMeeting() {
    this.savePromise = createRecord(this.store, 'meetings', this.newMeeting);
    const meeting = await this.savePromise;
    this.isOpenNewMeetingModal = false;
    this.router.transitionTo('meeting', meeting.id);
  }
}
