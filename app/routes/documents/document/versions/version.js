import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DocumentsDocumentVersionsVersionRoute extends Route {
  @service store;

  async model({ version_number }) {
    const document = this.modelFor('documents.document');
    const documentVersion = await this.store.queryOne('document-version', {
      'filter[document][:id:]': document.id,
      'filter[version-number]': version_number,
      include: 'file',
    });
    const file = await documentVersion.file;

    return {
      documentVersion,
      document,
      file,
    };
  }
}
