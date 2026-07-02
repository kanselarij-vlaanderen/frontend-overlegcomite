import Model, { attr, belongsTo } from '@warp-drive/legacy/model';

export default class AccountModel extends Model {
  @attr('string') name;

  @belongsTo('user', { inverse: 'account', async: true }) user;
}
