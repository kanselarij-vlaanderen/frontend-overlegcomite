import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  addingDocuments: false,
  currentSession: service(),

  actions: {
    toggleAddingDocuments() {
      this.toggleProperty('addingDocuments');
    }
  }
});
