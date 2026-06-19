import Model, { attr, belongsTo, hasMany } from '@warp-drive/legacy/model';

export default class OrganizationModel extends Model {
  @attr('string') name;

  @belongsTo('membership', {inverse: 'organization', async: true}) memberships;
}
