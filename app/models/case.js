import Model, { hasMany, attr } from '@ember-data/model';

export default Model.extend({
  identifier: attr('string'),
  agendaItems: hasMany('agendaitem'),
});
