import DS from 'ember-data';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
const { Model, attr, hasMany, belongsTo } = DS;
import { sort } from '@ember/object/computed';

export default Model.extend({
  title: attr('string'),
  name: alias('title'),
  created: attr('datetime'),

  type: belongsTo('document-type'),

  documentVersions: hasMany('document-version'),
  sortedDocumentVersions: sort('documentVersions', 'versionNumber')  ,

  reverseSortedDocumentVersions: computed('sortedDocumentVersions.[]', function() {
    return this.get('sortedDocumentVersions').reverse();
  }),

  lastDocumentVersion: alias('sortedDocumentVersions.lastObject'),
});
