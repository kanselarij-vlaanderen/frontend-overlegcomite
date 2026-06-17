import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { cacheKeyFor } from '@warp-drive/core';
import { task } from 'ember-concurrency';

export default class FileCard extends Component {
  @service store;

  @tracked accessLevelOptions = [];
  @tracked documentVersions = [];

  @tracked isEditingDocumentName = false;

  constructor() {
    super(...arguments);

    this.init.perform();
  }

  init = task(async () => {
    this.documentVersions = await this.document.documentVersions;

    this.accessLevelOptions = (
      await this.store.queryAll('access-level', { sort: 'priority' })
    ).toArray();
  });

  get sortedDocumentVersions() {
    return this.documentVersions.toSorted(
      (v1, v2) => v2.versionNumber - v1.versionNumber,
    );
  }
  get selectedVersion() {
    return this.sortedDocumentVersions[0];
  }

  get document() {
    return this.args.document;
  }

  get showFooter() {
    return this.sortedDocumentVersions?.length > 1;
  }

  @action
  async saveDocumentName() {
    await this.document.save();
    this.isEditingDocumentName = false;
  }

  @action
  cancelEditingDocumentName() {
    this.store.cache.rollbackAttrs(cacheKeyFor(this.document));
    this.isEditingDocumentName = false;
  }
}
