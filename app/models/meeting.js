import Model, { attr } from '@warp-drive/legacy/model';

export default class MeetingModel extends Model {
  @attr('date') startedAt;
  @attr('string') uri;
}
