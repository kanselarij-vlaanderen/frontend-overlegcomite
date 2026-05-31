import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class MeetingForm extends Component {
  get startedAtDate() {
    const date = this.args.meeting.startedAt.toPlainDate();
    return date.toString();
  }

  get startedAtHour() {
    return this.args.meeting.startedAt.hour;
  }

  get startedAtMinute() {
    return this.args.meeting.startedAt.minute;
  }

  @action
  setStartedAtDate(dateString) {
    const newDate = Temporal.PlainDate.from(dateString);
    this.args.meeting.startedAt = this.args.meeting.startedAt.with({
      year: newDate.year,
      month: newDate.month,
      day: newDate.day
    });
  }

  @action
  setStartedAtTime(time) {
    this.args.meeting.startedAt = this.args.meeting.startedAt.with({
      hour: time.hours,
      minute: time.minutes
    })
  }
}
