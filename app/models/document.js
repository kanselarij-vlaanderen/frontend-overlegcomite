import Model, { belongsTo, hasMany, attr } from '@ember-data/model';
import { computed } from '@ember/object';
import { alias, sort } from '@ember/object/computed';

export default Model.extend({
  name: attr('string'),
  created: attr('datetime'),

  type: belongsTo('document-type', {async: false}),

  documentVersions: hasMany('document-version', {async: false}),
  sortDefinition: ['versionNumber', 'file.created'], // eslint-disable-line ember/avoid-leaking-state-in-ember-objects
  sortedDocumentVersions: sort('documentVersions', 'sortDefinition'),

  reverseSortedDocumentVersions: computed('sortedDocumentVersions.[]', function() {
    return this.get('sortedDocumentVersions').reverse();
  }),

  lastDocumentVersion: alias('sortedDocumentVersions.lastObject'),

  loadDocumentVersions: function() {
    const versions = this.store.query('document-version', {
      filter: { document: { id: this.get('id') } },
      include: ['access-level', 'file']
    });
    const type = this.store.query(type)
  },
  loadType: function() {
    const versions = this.store.query('document-type', {
      filter: { document: { id: this.get('id') } }
    });
    const type = this.store.query(type)
  },
  loadRelations: function() {
    return this.store.findRecord('document', this.get('id'), {
      include: 'type,document-versions,document-versions.access-level,document-versions.file',
      reload: true
    });
  }
});
