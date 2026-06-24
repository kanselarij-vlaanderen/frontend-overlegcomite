import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class DocumentCardComponent extends Component {
  @service store;

  @tracked documentVersions = [];

  constructor() {
    super(...arguments);

    this.init.perform();
  }

  init = task(async () => {
    this.documentVersions = await this.store.queryAll('document-version', {
      'filter[document][:id:]': this.args.document.id,
      sort: '-version-number',
      include: 'file,document'
    });
  });

  get sortedDocumentVersions() {
    return this.documentVersions.slice().sort(
      (v1, v2) => v2.versionNumber - v1.versionNumber,
    );
  }

  get latestVersion() {
    return this.sortedDocumentVersions[0];
  }

  get hasMultipleVersions() {
    return this.sortedDocumentVersions?.length > 1;
  }
}
