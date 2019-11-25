import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import moment from 'moment';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class extends Component {
  @service store;
  @tracked documents = A([]);
  @tracked documentTypeOptions = A([]);

  @tracked loading = false;

  constructor() {
    super(...arguments);
    if (this.args.editable !== undefined) {
      this.editable = this.args.editable;
    }
    let that = this;
    this.store.findAll('document-type').then(function(documentTypes) {
      that.documentTypeOptions = documentTypes.toArray();  // ember-power-select 4.0.0-beta.3 only supports POJ Arrays, see https://github.com/cibernox/ember-power-select/issues/1296
    });
  }

  @action
  async createDocument(file) {
    const creationTime = moment().toDate();
    const document = this.store.createRecord('document', {
      created: creationTime,
      type: this.args.defaultDocumentType,
      name: file.filenameWithoutExtension
    });
    this.store.createRecord('document-version', {
      created: creationTime,
      accessLevel: this.args.defaultAccessLevel,
      versionNumber: 1,
      file,
      document
    });
    this.documents.pushObject(document);
  }

  @action
  async deleteDocument(document) {
    await document.documentVersions.firstObject.file.destroyRecord();
    await document.documentVersions.firstObject.deleteRecord();
    await document.deleteRecord();
    return this.documents.popObject(document);
  }

  @action
  async save(documents) {
    this.loading = true;
    const savingDocuments = documents.map(async (document) => {
      await document.save();
      await document.documentVersions.firstObject.save();
      return document;
    });
    const savedDocuments = await Promise.all(savingDocuments);
    if (this.args.didSave) {
      await this.args.didSave(savedDocuments);
    }
    this.loading = false;
  }

  @action
  async cancel() {
    const documents = this.documents;
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
