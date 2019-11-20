import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Component {
  @service store;
  @tracked document = null;
  @tracked selectedVersion = null;

  @tracked loading = false;
  @tracked deletingDocument = false;
  @tracked deletingVersion = false;
  @tracked addingDocument = false;
  @tracked addingVersion = false

  constructor() {
    super(...arguments);
    this.loading = true;
    this.args.document.loadRelations().then((document) => {
      this.document = document;
      if (this.args.selectedVersion) {
        this.selectedVersion = document.documentVersions.findBy('id', this.args.selectedVersion.get('id'))
      } else {
        this.selectedVersion = this.document.lastDocumentVersion;
      }
      this.loading = false;
    })
  }

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

  async deleteVersion(documentVersion) {
    await documentVersion.get('file').destroyRecord();
    return documentVersion.destroyRecord();
  }

  uploadVersion() {

  }
}
