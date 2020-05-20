import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class MeetingFormComponent extends Component {
  get dateForPicker () { // TODO imported datepicker only supports list of dates fro arg 'date'
    return [this.args.meeting.startedAt];
  }

  @action
  setMeetingDate(startedAt) {
    this.args.meeting.startedAt = startedAt;
  }
}
