import Model, { attr, hasMany } from '@warp-drive/legacy/model';

export default class RoleModel extends Model {
  @attr('string') uri;
  @attr('string') label;
  @attr('number') position;

  @hasMany('membership', { inverse: 'role', async: true }) memberships;
}
