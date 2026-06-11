import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MeetingDocumentsRoute extends Route {
  @service store;

  async model() {
    const meeting = this.modelFor('meeting');
    const documents = await meeting.documents;

    return { meeting, documents };
  }
}
