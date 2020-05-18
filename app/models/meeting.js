import Model, { hasMany, attr } from '@ember-data/model';
import { sort } from '@ember/object/computed';

export default class MeetingModel extends Model {
  @attr('datetime') startedAt;

  @hasMany('agendaitem') agendaItems;
  agendaItemSortProperties = Object.freeze(['priority:asc', 'subPriority:asc']);
  sortedAgendaItems = sort('agendaItems', 'agendaItemSortProperties');

  @hasMany('document') documents;
}
