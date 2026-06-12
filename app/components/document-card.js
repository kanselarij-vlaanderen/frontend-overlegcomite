import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { cacheKeyFor } from '@warp-drive/core';

export default class FileCard extends Component {
  @service store;

  @tracked accessLevelOptions = [];
  @tracked documentVersions = [];

  @tracked isEditingDocumentName = false;

  constructor() {
    super(...arguments);

    this.store
      .queryAll('access-level', {
        sort: 'priority',
      })
      .then((accessLevelOptions) => {
        this.accessLevelOptions = accessLevelOptions;
      });

    this.document.get('documentVersions').then((documentVersions) => {
      this.documentVersions = documentVersions;
    });
  }

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
