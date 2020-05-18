import Model, { belongsTo, hasMany, attr } from '@ember-data/model';
import { computed } from '@ember/object';
import { alias, sort } from '@ember/object/computed';

export default class DocumentModel extends Model {
  @attr('string') name;
  @attr('datetime') created;

  @belongsTo('document-type', {async: false}) type;

  @hasMany('document-version', {async: false}) documentVersions;

  sortDefinition = Object.freeze(['versionNumber', 'file.created']);
  sortedDocumentVersions = sort('documentVersions', 'sortDefinition');

  get reverseSortedDocumentVersions () {
    return this.sortedDocumentVersions.reverse();
  }

  @alias('sortedDocumentVersions.lastObject') lastDocumentVersion;

  loadDocumentVersions () {
    const versions = this.store.query('document-version', {
      filter: { document: { id: this.get('id') } },
      include: ['access-level', 'file']
    });
    const type = this.store.query(type)
  }
  loadType () {
    const versions = this.store.query('document-type', {
      filter: { document: { id: this.get('id') } }
    });
    const type = this.store.query(type)
  }
  loadRelations () {
    return this.store.findRecord('document', this.id, {
      include: 'type,document-versions,document-versions.access-level,document-versions.file',
      reload: true
    });
  }
}
