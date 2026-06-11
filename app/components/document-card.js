import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { cacheKeyFor } from '@warp-drive/core';

export default class FileCard extends Component {
  @service store;

  @tracked accessLevelOptions = [];

  @tracked isEditingDocumentName = false;

  constructor() {
    super(...arguments);
    this.accessLevelOptions = this.store.query('access-level', {
      sort: 'priority',
    });
  }

  get document() {
    return this.args.document;
  }

  get selectedVersion() {
    if (this.args.selectedVersion) {
      return this.args.selectedVersion;
    } else {
      const sorted = this.sortedDocumentVersions;
      return sorted[0];
    }
  }

  get sortedDocumentVersions() {
    return this.document
      .get('documentVersions')
      .toSorted((v1, v2) => v2.versionNumber - v1.versionNumber);
  }

  get accessLevelOptions() {
    return this.store.query('access-level', { sort: 'priority' });
  }

  get showFooter() {
    return this.document.get('documentVersions').length > 1;
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
