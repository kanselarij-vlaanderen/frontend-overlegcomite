import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class MeetingForm extends Component {

  get meeting() {
    return this.args.meeting;
  }

  get startedAtDate() {
    const date = this.meeting.startedAt.toPlainDate();
    return date.toString();
  }

  @action
  setStartedAtDate(dateString) {
    const dateTime = this.meeting.startedAt;
    const newDate = Temporal.PlainDate.from(dateString)

    this.meeting.startedAt = dateTime.with({
        year: newDate.year,
        month: newDate.month,
        day: newDate.day
    });
  }

}
