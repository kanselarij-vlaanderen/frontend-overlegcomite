import DS from 'ember-data';
import { computed } from '@ember/object';
import formatVersionedDocumentName from 'frontend-overlegcomite/utils/format-versioned-document-name';
import sanitize from 'sanitize-filename';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  created: attr('datetime'),
  versionNumber: attr('number'),
  confidential: attr('boolean'),
  accessLevel: belongsTo('access-level'),

  file: belongsTo('file'),
  document: belongsTo('document', { inverse: null }),

  name: computed('document.name', async function() {
    const documentName = await this.get('document.name');
    return formatVersionedDocumentName(documentName, this.get('versionNumber'));
  }),

  downloadFilename: computed('name', 'file.extension', async function() {
    const filename = `${await this.get('name')}.${await this.get('file.extension')}`;
    return sanitize(filename, {replacement: '_'});
  }),

  downloadLink: computed('file.downloadLink', 'downloadFilename', async function() {
    return `${await this.get('file.downloadLink')}&name=${await this.get('downloadFilename')}`;
  })
});
