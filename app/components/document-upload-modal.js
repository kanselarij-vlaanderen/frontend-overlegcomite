import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import moment from 'moment';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class extends Component {
  @service store;
  @tracked documents = A([]);

  constructor() {
    super(...arguments);
    if (this.args.editable !== undefined) {
      this.editable = this.args.editable;
    }
  }

  @action
  createDocument(file) {
    const creationTime = moment().toDate();
    const version = this.store.createRecord('document-version', {
      created: creationTime,
      accessLevel: this.args.defaultAccessLevel,
      versionNumber: 1,
      file,
    });
    const document = this.store.createRecord('document', {
      created: creationTime,
      type: this.args.defaultDocumentType,
      documentVersions: A([version]),
    });
    this.documents.pushObject(document);
  }

  @action
  async deleteDocument(document) {
    await document.documentVersions.firstObject.file.destroyRecord();
    await document.documentVersions.firstObject.deleteRecord();
    await document.deleteRecord();
  }

  @action
  async save(documents) {
    this.isLoading = true;
    const savingDocuments = documents.map(async (document) => {
      await document.documentVersions.firstObject.save();
      return document.save();
    });
    const savedDocuments = await Promise.all(savingDocuments);
    this.isLoading = false;
    if (this.args.didSave) {
      this.args.didSave(savedDocuments);
    }
  }

  @action
  async cancel() {
    const documents = this.documents;
    this.isLoading = true;
    const deletingDocuments = documents.map(async (document) => {
      const file = await document.documentVersions.firstObject.file;
      await file.destroyRecord(); // File has already been persisted, others haven't
      await document.documentVersions.firstObject.deleteRecord();
      return document.deleteRecord();
    });
    const deletedDocuments = await Promise.all(deletingDocuments);
    this.isLoading = false;
    if (this.args.didCancel) {
      this.args.didCancel(deletedDocuments);
    }
  }
}
