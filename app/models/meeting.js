import DS from 'ember-data';
const { Model, attr, hasMany } = DS;

export default Model.extend({
  startedAt: attr('datetime'),

  agendaItems: hasMany('agendaitem'),
});
