import Model, { attr } from '@warp-drive/legacy/model';

export default class GovernmentBodyModel extends Model {
  @attr('string') uri;
  @attr('string') name;
  @attr('datetime') bindingStart;
}
