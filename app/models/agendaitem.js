import Model, { attr, belongsTo, hasMany } from '@warp-drive/legacy/model';

export default class AgendaitemModel extends Model {
  @attr('string') uri;
  @attr('string') subject;
  @attr('number') priority;
  @attr('string') subPriority;

  @belongsTo('meeting', { inverse: 'agendaItems', async: true }) meeting;
  @belongsTo('case', { inverse: 'agendaItems', async: true }) case;
  @hasMany('government-body', { inverse: null, async: true }) submitters;
}
