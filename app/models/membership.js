import Model, { belongsTo } from '@warp-drive/legacy/model';

export default class MembershipModel extends Model {
  @belongsTo('user', { inverse: 'memberships', async: true }) user;
  @belongsTo('user-organization', { inverse: 'memberships', async: true }) organization;
  @belongsTo('role', { inverse: 'memberships', async: true }) role;
}
