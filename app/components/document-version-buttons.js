import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { cacheKeyFor } from '@warp-drive/core';
import { task } from 'ember-concurrency';

export default class DocumentVersionButtons extends Component {
  @service store;

  @tracked isEditingAccessLevel = false;
  @tracked isAddingVersion = false;

  @tracked accessLevelOptions = [];
  @tracked document = null;
  @tracked file = null;

  constructor() {
    super(...arguments);
    this.init.perform();
  }

  init = task(async () => {
    this.file = await this.args.version?.file;
  });

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

  toggleConfidential = () => {
    this.args.version.confidential = !this.args.version.confidential;
    this.args.version.save();
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
