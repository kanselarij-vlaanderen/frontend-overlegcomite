import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MeetingDocumentsRoute extends Route {
  @service store;

  async model() {
    const meeting = this.modelFor('meeting');
    // Documents are included in the parent route
    const documents = await meeting.documents;

    return { meeting, documents };
  }
}
