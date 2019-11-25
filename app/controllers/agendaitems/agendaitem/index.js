import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { NOTIFICATION_TYPE_ID } from 'frontend-overlegcomite/config/constants';

export default Controller.extend({
  addingDocuments: false,
  addingNotification: false,
  currentSession: service(),
  store: service(),

  init() {
    this._super(...arguments);
    const notificationType = this.store.findRecord('document-type', NOTIFICATION_TYPE_ID);
    this.set('notificationType', notificationType);
  },

  actions: {
    async addDocuments(documents) {
      this.get('model.documents').pushObjects(documents);
      await this.get('model').save();
      this.set('addingDocuments', false);
    },

    async addNotification([document]) {
      this.set('model.notification', document);
      await this.get('model').save();
      this.set('addingNotification', false);
    },

    async deleteDocument(document) {
      this.get('model.documents').popObject(document);
      await this.get('model').save();
    }
  }
});
