import Component from '@glimmer/component';
import moment from 'moment';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class extends Component {
  @service store;

  @tracked document = null;

  @tracked accessLevelOptions = A([]);

  @tracked loading = false;
  @tracked deletingDocument = false;
  @tracked deletingVersion = false;
  @tracked addingDocument = false;
  @tracked addingVersion = false;

  constructor() {
    super(...arguments);
    this.loading = true;
    this.args.document.loadRelations().then((document) => {
      this.document = document;
      this.loading = false;
    })
    this.store.findAll('access-level').then((als) => this.accessLevelOptions = als);
  }

  get selectedVersion() {
    if (this.args.selectedVersion) {
      return document.documentVersions.findBy('id', this.args.selectedVersion.get('id'))
    } else {
      return this.document.lastDocumentVersion;
    }
  }

  @action
  async deleteDocument(document) {
    // Cascade delete versions
    const versionDeletes = document.documentVersions.map(async (documentVersion) => {
      await documentVersion.get('file').destroyRecord();
      await documentVersion.destroyRecord();
      return;
    });
    await Promise.all(versionDeletes);
    return document.destroyRecord();
  }

  @action
  async deleteVersion(documentVersion) {
    await documentVersion.get('file').destroyRecord();
    await this.document.documentVersions.popObject(documentVersion).destroyRecord();
    if (this.document.documentVersions.length === 0) {
      this.document.destroyRecord();
      this.didDeleteDocument(this.document);
    }
  }

  @action
  async addVersion(file) {
    this.addingVersion = false;
    this.loading = true;
    const creationTime = moment().toDate();
    const version = this.store.createRecord('document-version', {
      created: creationTime,
      accessLevel: this.args.defaultAccessLevel,
      versionNumber: this.document.sortedDocumentVersions.lastObject.versionNumber + 1,
      file,
    });
    this.document.documentVersions.pushObject(version);
    await version.save();
    await this.document.save();
    this.loading = false;
  }

  @action
  toggleAccessLevel(documentVersion) {
    documentVersion.confidential = !documentVersion.confidential;
    documentVersion.save();
  }
}
