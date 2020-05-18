import Model, { hasMany, belongsTo, attr } from '@ember-data/model';

export default class AgendaItemModel extends Model {
  @attr('number') priority;
  @attr('string') subPriority;
  @attr('string') subject;

  @belongsTo('meeting') meeting;
  @belongsTo('case') case;

  @hasMany('government-body') submitters;
  @belongsTo('file') meetingRecord;
  @belongsTo('document') notification;

  @hasMany('document') documents;
}
