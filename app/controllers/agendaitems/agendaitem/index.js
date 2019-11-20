import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  addingDocuments: false,
  currentSession: service(),

  actions: {
    toggleAddingDocuments() {
      this.toggleProperty('addingDocuments');
    },

    async addDocuments(documents) {
      this.get('model.documents').pushObjects(documents);
      await this.get('model').save();
      this.set('addingDocuments', false);
    }
  }
});
