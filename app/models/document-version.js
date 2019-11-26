import DS from 'ember-data';
import { computed } from '@ember/object';
import formatVersionedDocumentName from 'frontend-overlegcomite/utils/format-versioned-document-name';
import sanitize from 'sanitize-filename';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  created: attr('datetime'),
  versionNumber: attr('number'),
  confidential: attr('boolean'),
  accessLevel: belongsTo('access-level', { async: false }),

  file: belongsTo('file', { async: false }),
  document: belongsTo('document', { async:false }),

  name: computed('document.name', function() {
    return formatVersionedDocumentName(this.get('document.name'), this.get('versionNumber'));
  }),

  downloadFilename: computed('name', 'file.extension', function() {
    const filename = `${this.get('name')}.${this.get('file.extension')}`;
    return sanitize(filename, {replacement: '_'});
  }),

  downloadLink: computed('file.downloadLink', 'downloadFilename', function() {
    return `${this.get('file.downloadLink')}?name=${this.get('downloadFilename')}`;
  })
});
