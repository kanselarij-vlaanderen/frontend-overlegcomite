import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MeetingsMeetingIndexRoute extends Route {
  @service router;

  beforeModel() {
    this.router.replaceWith('meetings.meeting.agendaitems');
  }
}
