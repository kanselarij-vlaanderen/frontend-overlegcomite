import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DocumentsDocumentVersionsIndexRoute extends Route {
  @service store;
  @service router;

  model({ document_version_id }) {
    return this.store.findRecord('document-version', document_version_id);
  }

  async afterModel(model) {
    const document = await model.document;
    this.router.transitionTo(
      'documents.document.versions.version',
      document.id,
      model.versionNumber
    );
  }
}
