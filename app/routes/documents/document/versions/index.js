import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DocumentsDocumentVersionsIndexRoute extends Route {
  @service store;
  @service router;

  async model() {
    const document = this.modelFor('documents.document');
    const latestDocumentVersion = await this.store.queryOne('document-version', {
      'filter[document][:id:]': document.id,
      sort: '-version-number'
    });

    return { document, documentVersion: latestDocumentVersion };
  }

  afterModel(model) {
    this.router.transitionTo(
      'documents.document.versions.version',
      model.document.id,
      model.documentVersion.versionNumber
    );
  }
}
