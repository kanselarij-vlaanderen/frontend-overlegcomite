import Model, { attr, belongsTo, hasMany } from '@warp-drive/legacy/model';

export default class UserModel extends Model {
  @attr('string') firstName;
  @attr('string') lastName;
  @attr('string') email;

  @belongsTo('account', { inverse: 'user', async: true }) account;
  @hasMany('membership', { inverse: 'user', async: true }) memberships;

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
