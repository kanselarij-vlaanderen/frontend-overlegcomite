import Model, { attr, belongsTo, hasMany } from '@warp-drive/legacy/model';
import constants  from '../config/constants';

const { USER_ACCESS_STATUSES } = constants;

export default class UserModel extends Model {
  @attr('string') firstName;
  @attr('string') lastName;
  @attr('string') email;

  @belongsTo('account', { inverse: 'user', async: true }) account;
  @belongsTo('concept', { inverse: null, async: true }) status;
  @hasMany('membership', { inverse: 'user', async: true }) memberships;

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get isBlocked() {
    return this.status.get('uri') === USER_ACCESS_STATUSES.BLOCKED;
  }
}
