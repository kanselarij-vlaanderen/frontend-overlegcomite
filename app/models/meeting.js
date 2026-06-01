import Model, { attr, hasMany } from '@warp-drive/legacy/model';

export default class MeetingModel extends Model {
  @attr('string') uri;
  @attr('datetime') startedAt;

  @hasMany('agendaitem', { inverse: 'meeting', async: true }) agendaItems;
}
