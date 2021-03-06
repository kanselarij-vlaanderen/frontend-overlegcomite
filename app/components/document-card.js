import Component from '@glimmer/component';
import moment from 'moment';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class extends Component {
  @service router;
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
    if (this.args.document.type === null ||
      this.args.document.documentVersions === null
    ) {
      this.loading = true;
      this.args.document.loadRelations().then((document) => {
        this.document = document;
        this.loading = false;
      });
    } else {
      this.document = this.args.document;
    }
    this.accessLevelOptions = this.store.query('access-level', { sort: 'priority' });
  }

  get selectedVersion() {
    if (this.args.selectedVersion) {
      return this.document.documentVersions.findBy('id', this.args.selectedVersion.get('id'));
    } else {
      return this.document.lastDocumentVersion;
    }
  }

  @action
  async deleteDocument(document) {
    // Cascade delete versions
    this.loading = true;
    const versionDeletes = document.documentVersions.map(async (documentVersion) => {
      await documentVersion.get('file').destroyRecord();
      return await documentVersion.destroyRecord();
    });
    await Promise.all(versionDeletes);
    await document.destroyRecord();
    this.loading = false;
  }

  @action
  async deleteVersion(documentVersion) {
    await documentVersion.get('file').destroyRecord();
    await documentVersion.destroyRecord();
    if (this.document.documentVersions.length === 0) {
      this.loading = true;
      await this.document.destroyRecord();
      this.loading = false;
    }
  }

  @action
  async addVersion(file) {
    this.addingVersion = false;
    this.loading = true;
    const creationTime = moment().toDate();
    const lastVersion = this.document.sortedDocumentVersions.lastObject;
    const version = this.store.createRecord('document-version', {
      created: creationTime,
      confidential: lastVersion.confidential,
      accessLevel: lastVersion.accessLevel,
      versionNumber: lastVersion.versionNumber + 1,
      file,
      document: this.document
    });
    await version.save();
    this.loading = false;
  }

  @action
  toggleAccessLevel(documentVersion) {
    documentVersion.confidential = !documentVersion.confidential;
    documentVersion.save();
  }

  @action
  saveAccessLevel(documentVersion, accessLevel) {
    documentVersion.accessLevel = accessLevel;
    return documentVersion.save();
  }

  @action
  saveName(name) {
    this.document.name = name;
    return this.document.save();
  }

  @action
  view(documentVersion) {
    const url = this.router.urlFor('view-document', documentVersion);
    window.open(url, '_blank');
  }
}
