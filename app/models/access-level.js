import Model, { attr, hasMany } from '@warp-drive/legacy/model';

export default class AccessLevelModel extends Model {
  @attr('string') label;
  @attr('string') altLabel;
  @attr('string') scopeNote;
  @attr('number') priority;

  @hasMany('document-version', { inverse: 'accessLevel', async: true })
  documents;
}
