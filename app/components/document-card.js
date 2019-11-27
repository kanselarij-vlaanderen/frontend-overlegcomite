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
    this.store.findAll('access-level').then((als) => this.accessLevelOptions = als.toArray()); // ember-power-select 4.0.0-beta.3 only supports POJ Arrays, see https://github.com/cibernox/ember-power-select/issues/1296
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
      return await documentVersion.destroyRecord();
    });
    await Promise.all(versionDeletes);
    return document.destroyRecord();
  }

  @action
  async deleteVersion(documentVersion) {
    await documentVersion.get('file').destroyRecord();
    await documentVersion.destroyRecord();
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
  view(documentVersion) {
    const url = this.router.urlFor('view-document', documentVersion);
    window.open(url, '_blank');
  }
}
