import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentSession: service(),

  isLoading: false,
  showAddNotification: false,
  showAddDocuments: false,

  actions: {
    showAddNotification() {
      this.set('showAddNotification', true);
    },

    showAddDocuments() {
      this.set('showAddDocuments', true);
    },

    saveDocuments(documents) {
      this.set('isLoading', true);
      let savePromises = documents.filter(doc => doc.hasDirtyAttributes).invoke('save');
      this.get('model.documents').then(docs => {
        docs.addObjects(documents);
      });
      return Promise.all(savePromises)
        .then(() => {
          return this.get('model')
            .save()
            .then(() => {
              this.set('showAddDocuments', false);
            });
        })
        .catch(error => {
          // Handle error
        });
    },

    saveNotification(documents) {
      this.set('isLoading', true);
      let notification = documents.firstObject;
      this.set('model.notification', notification);
      return notification
        .save()
        .then(() => {
          return this.get('model')
            .save()
            .then(() => {
              this.set('showAddNotification', false);
            });
        })
        .catch(error => {
          // Handle error
        });
    },

    detachDocument(doc) {
      this.get('model.documents').removeObject(doc);
      return this.get('model').save();
    },

    cancel() {
      this.set('showAddDocuments', false);
      this.set('showAddNotification', false);
    }
  }
});
