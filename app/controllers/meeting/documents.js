import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { DEFAULT_MEETING_DOC_TYPE_ID } from 'frontend-overlegcomite/config/config';

export default Controller.extend({
  currentSession: service(),
  meeting: alias('model'),

  addingDocuments: false,
  loading: false,

  store: service(),

  init() {
    this._super(...arguments);
    const defaultDocumentType = this.store.findRecord('document-type', DEFAULT_MEETING_DOC_TYPE_ID);
    this.set('defaultDocumentType', defaultDocumentType);
  },

  actions: {
    async addDocuments(documents) {
      this.set('loading', true);
      this.get('model.documents').pushObjects(documents);
      await this.get('model').save();
      this.set('addingDocuments', false);
      this.set('loading', false);
    },

    async deleteDocument(document) {
      this.get('model.documents').popObject(document);
      await this.get('model').save();
    }
  }
});
