import DS from 'ember-data';
const { Model, attr, hasMany } = DS;
import { sort } from '@ember/object/computed';

export default Model.extend({
  startedAt: attr('datetime'),
  agendaReleaseTime: attr('datetime'),
  notificationReleaseTime:  attr('datetime'),

  agendaItems: hasMany('agendaitem'),
  agendaItemSortProperties: ['priority:asc', 'subPriority:asc'], // eslint-disable-line ember/avoid-leaking-state-in-ember-objects
  sortedAgendaItems: sort('agendaItems', 'agendaItemSortProperties')

});
