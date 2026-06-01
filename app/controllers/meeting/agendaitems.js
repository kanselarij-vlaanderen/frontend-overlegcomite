import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class MeetingAgendaitemsController extends Controller {
  @service store;
  @service router;

  get isIndexRoute() {
    return this.router.isActive('meeting.agendaitems.index');
  }
}
