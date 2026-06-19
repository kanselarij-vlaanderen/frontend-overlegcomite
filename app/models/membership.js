import Model, { attr, belongsTo, hasMany } from '@warp-drive/legacy/model';

export default class MembershipModel extends Model {
  @belongsTo('user', {inverse: 'memberships', async: true}) user;
  @belongsTo('organization', {inverse: 'memberships', async: true}) organization;
}
