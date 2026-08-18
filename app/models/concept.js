import Model, { attr } from '@warp-drive/legacy/model';

export default class ConceptModel extends Model {
  @attr('string') uri;
  @attr('string') label;
}
