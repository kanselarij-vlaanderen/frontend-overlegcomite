import Model, { attr, hasMany } from '@warp-drive/legacy/model';

export default class UserOrganizationModel extends Model {
  @attr('string') name;
  @attr('string') identifier;

  @hasMany('membership', { inverse: 'organization', async: true }) memberships;
}
