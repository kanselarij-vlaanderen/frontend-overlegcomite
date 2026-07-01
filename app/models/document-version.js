import Model, { attr, belongsTo } from '@warp-drive/legacy/model';

export default class DocumentVersionModel extends Model {
  @attr('datetime') created;
  @attr('number') versionNumber;
  @attr('boolean') confidential;

  @belongsTo('document', { inverse: 'documentVersions', async: true })
  document;
  @belongsTo('file', { inverse: null, async: true }) file;
  @belongsTo('access-level', { inverse: 'documents', async: true })
  accessLevel;
}
