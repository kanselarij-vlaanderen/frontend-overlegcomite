import Model, { belongsTo, hasMany, attr } from '@ember-data/model';
import { alias, sort } from '@ember/object/computed';

export default class DocumentModel extends Model {
  @attr('string') name;
  @attr('datetime') created;

  @belongsTo('document-type', { async: false }) type;

  @hasMany('document-version', { async: false }) documentVersions;

  sortDefinition = Object.freeze(['versionNumber', 'file.created']);
  @sort('documentVersions', 'sortDefinition') sortedDocumentVersions;

  get reverseSortedDocumentVersions () {
    return this.sortedDocumentVersions.reverse();
  }

  @alias('sortedDocumentVersions.lastObject') lastDocumentVersion;

  loadRelations () {
    return this.store.findRecord('document', this.id, {
      include: 'type,document-versions,document-versions.access-level,document-versions.file',
      reload: true
    });
  }
}
