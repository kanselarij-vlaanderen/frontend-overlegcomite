import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class MeetingsMeetingAgendaitemsController extends Controller {
  @service router;

  get isIndexRoute() {
    return this.router.isActive('meetings.meeting.agendaitems.index');
  }
}
