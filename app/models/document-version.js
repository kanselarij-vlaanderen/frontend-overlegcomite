import Model, { attr, belongsTo, hasMany } from '@warp-drive/legacy/model';

export default class DocumentVersionModel extends Model {
  @attr('datetime') created;
  @attr('number') versionNumber;
  @attr('boolean') confidential;

  @belongsTo('document', { inverse: 'documentVersions', async: false}) document;
  @belongsTo('file', { inverse: null, async: false }) file;
  @belongsTo('access-level', { inverse: 'documents', async: false }) accessLevel;
}
