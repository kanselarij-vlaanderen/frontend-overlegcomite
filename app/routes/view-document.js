import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ViewDocumentRoute extends Route {
  @service session;
  @service store;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'auth.login-redirect');
  }

  async model({ document_id, version_number }) {
    const documentVersion = await this.store.queryOne('document-version', {
      'filter[document][:id:]': document_id,
      'filter[:exact:version-number]': version_number,
      include: 'file,document',
    });

    return {
      documentVersion,
      document: await documentVersion.document,
      file: await documentVersion.file,
    };
  }

  serialize(model) {
    const document = model.document;
    const documentVersion = model.documentVersion
      ? model.documentVersion
      : model;

    return {
      document_id: document.id,
      version_number: documentVersion.versionNumber,
    };
  }
}
