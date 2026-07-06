import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class MeetingsMeetingDocumentsController extends Controller {
  @tracked isDocumentUploadModalOpen = false;

  @action
  async saveDocuments(newDocuments) {
    (await this.model.meeting.documents).push(...newDocuments)
    await this.model.meeting.save();
    this.isDocumentUploadModalOpen = false;
  }
}
