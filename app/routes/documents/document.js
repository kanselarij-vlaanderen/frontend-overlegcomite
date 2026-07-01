import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DocumentsDocumentRoute extends Route {
  @service store;

  model({ document_id }) {
    return this.store.findRecord('document', document_id);
  }
}
