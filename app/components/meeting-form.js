import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class MeetingForm extends Component {
  get startedAtDate() {
    const date = this.args.meeting.startedAt.toPlainDate();
    return date.toString();
  }

  @action
  setStartedAtDate(dateString) {
    const dateTime = this.args.meeting.startedAt;
    const newDate = Temporal.PlainDate.from(dateString);

    this.args.meeting.startedAt = dateTime.with({
      year: newDate.year,
      month: newDate.month,
      day: newDate.day
    });
  }
}
