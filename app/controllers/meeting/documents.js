import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { DEFAULT_MEETING_DOC_TYPE_ID } from 'frontend-overlegcomite/config/config';
import { action } from '@ember/object';

export default class DocumentsMeeting extends Controller {
  @service currentSession;
  @alias('model') meeting;

  addingDocuments = false;
  loading = false;

  @service store;

  constructor() {
    super(...arguments);
    const defaultDocumentType = this.store.findRecord('document-type', DEFAULT_MEETING_DOC_TYPE_ID);
    this.set('defaultDocumentType', defaultDocumentType);
  }

  @action
  async addDocuments(documents) {
    this.set('loading', true);
    this.model.documents.pushObjects(documents);
    await this.model.save();
    this.set('addingDocuments', false);
    this.set('loading', false);
  }

  @action
  async deleteDocument(document) {
    this.model.documents.popObject(document);
    await this.model.save();
  }
}
