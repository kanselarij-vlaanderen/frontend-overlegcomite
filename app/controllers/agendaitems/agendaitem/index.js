import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { NOTIFICATION_TYPE_ID } from 'frontend-overlegcomite/config/constants';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  addingDocuments: false,
  addingNotification: false,

  meeting: alias('model.meeting'),

  loading: false,

  currentSession: service(),
  store: service(),

  init() {
    this._super(...arguments);
    const notificationType = this.store.findRecord('document-type', NOTIFICATION_TYPE_ID);
    this.set('notificationType', notificationType);
  },

  actions: {
    async addDocuments(documents) {
      this.set('loading', true);
      this.get('model.documents').pushObjects(documents);
      await this.get('model').save();
      this.set('addingDocuments', false);
      this.set('loading', false);
    },

    async addNotification([document]) {
      this.set('loading', true);
      this.set('model.notification', document);
      await this.get('model').save();
      this.set('addingNotification', false);
      this.set('loading', false);
    },

    async deleteDocument(document) {
      this.get('model.documents').popObject(document);
      await this.get('model').save();
    }
  }
});
