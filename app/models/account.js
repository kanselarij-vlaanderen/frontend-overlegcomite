import Model, { attr, belongsTo, hasMany } from '@warp-drive/legacy/model';

export default class AccountModel extends Model {
  @attr('string') accountName;

  @belongsTo('user', { inverse: 'account', async: true }) user;
}
