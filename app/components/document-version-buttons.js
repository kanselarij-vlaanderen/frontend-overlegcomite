import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { cacheKeyFor } from '@warp-drive/core';

export default class DocumentVersionButtons extends Component {
  @service store;

  @tracked isEditingAccessLevel = false;
  @tracked isAddingVersion = false;

  @tracked accessLevelOptions = [];

  constructor() {
    super(...arguments);

    this.store
      .queryAll('access-level', { sort: 'priority' })
      .then((accessLevelOptions) => {
        this.accessLevelOptions = accessLevelOptions.toArray();
      });
  }

  @action
  async saveAccessLevel() {
    this.isEditingAccessLevel = false;
    await this.args.version.save();
  }
  @action
  cancelEditingAccessLevel() {
    this.store.cache.rollbackRelationships(cacheKeyFor(this.args.version));
    this.isEditingAccessLevel = false;
  }

  @action
  toggleConfidential() {
    const version = this.args.version;
    version.confidential = !version.confidential;
    version.save();
  }

  @action
  async addVersion(files) {
    const [file] = files;
    const document = this.args.document;
    const now = Temporal.Now.zonedDateTimeISO();
    const baseVersion = this.args.version;
    const newVersion = this.store.createRecord('document-version', {
      created: now,
      document,
      file,
      confidential: baseVersion.confidential,
      accessLevel: await baseVersion.accessLevel,
      versionNumber: baseVersion.versionNumber + 1,
    });
    await newVersion.save();
    this.isAddingVersion = false;
  }

  @action
  async deleteVersion(version) {
    await (await version.file).destroyRecord();
    await version.destroyRecord();
  }

  @action
  async deleteDocument(document) {
    await Promise.all(
      (await document.documentVersions).map(this.deleteVersion),
    );
    await document.destroyRecord();
  }
}
