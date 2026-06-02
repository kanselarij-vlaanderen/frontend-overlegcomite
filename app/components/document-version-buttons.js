import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { cacheKeyFor } from '@warp-drive/core';

export default class DocumentVersionButtons extends Component {
  @service store;

  @tracked isEditingAccessLevel = false;

  get accessLevelOptions() {
    return this.store.query('access-level', { sort: 'priority' });
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
}
