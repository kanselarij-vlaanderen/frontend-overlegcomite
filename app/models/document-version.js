import Model, { belongsTo, attr } from '@ember-data/model';
import formatVersionedDocumentName from 'frontend-overlegcomite/utils/format-versioned-document-name';
import sanitize from 'sanitize-filename';

export default class DocumentVersionModel extends Model {
  @attr('datetime') created;
  @attr('number') versionNumber;
  @attr('boolean') confidential;
  @belongsTo('access-level', { async: false }) accessLevel;

  @belongsTo('file', { async: false }) file;
  @belongsTo('document', { async:false }) document;

  get name () {
    return formatVersionedDocumentName(this.document.name, this.versionNumber);
  }

  get downloadFilename () {
    const filename = `${this.name}.${this.file.extension}`;
    return sanitize(filename, {replacement: '_'});
  }

  get downloadLink () {
    return `${this.file.downloadLink}?name=${this.downloadFilename}`;
  }
}
