import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';
import textToDateRange from '../utils/text-to-date-range';

export default class MeetingsController extends Controller {
  @service store;
  @service router;

  @tracked sort = '-started-at';
  @tracked page = 0;
  @tracked size = 20;
  @tracked dateFilter = '';

  @tracked _dateFilterInput = null;

  get dateFilterInput() {
    if (this._dateFilterInput === null) {
      return this.dateFilter;
    } else {
      return this._dateFilterInput;
    }
  }

  set dateFilterInput(newInput) {
    this._dateFilterInput = newInput
    if (this.dateRange || newInput === '') {
      this.dateFilter = newInput;
      this.page = 0;
    }
  }

  get dateRange() {
    return textToDateRange(this._dateFilterInput);
  }

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
