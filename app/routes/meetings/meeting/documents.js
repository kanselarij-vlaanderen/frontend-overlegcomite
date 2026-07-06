import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MeetingsMeetingDocumentsRoute extends Route {
  @service store;

  async model() {
    const meeting = this.modelFor('meetings.meeting');
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    const reloadedMeeting = await this.store.findRecord('meeting', meeting.id, {
      include: [
        'documents.document-versions.file',
        'documents.document-versions.access-level',
      ],
      reload: true
    });

    // The relation between meeting and documents is currently defined in only one way.
    // Therefore we cannot query the documents and need to fetch them from the meeting.
    // By including the documents in the meeting request above, we ensure we have
    // the full list in an unpaginated way.
    const documents = await reloadedMeeting.documents;

    return { meeting, documents };
  }
}
