import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ViewDocumentRoute extends Route {
  @service store;

  async model({ document_id, version_number }) {
    const documentVersion = await this.store.queryOne('document-version', {
      'filter[document][:id:]': document_id,
      'filter[version-number]': version_number,
      include: 'file,document',
    });

    return documentVersion;
  }

  serialize(model) {
    return {
      document_id: model.document.id,
      version_number: model.versionNumber
    }
  }
}
