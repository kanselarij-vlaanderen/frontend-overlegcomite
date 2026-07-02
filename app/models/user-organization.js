import Model, { attr, belongsTo } from '@warp-drive/legacy/model';

export default class UserOrganizationModel extends Model {
  @attr('string') name;
  @attr('string') identifier;

  @belongsTo('membership', { inverse: 'organization', async: true }) memberships;
}
