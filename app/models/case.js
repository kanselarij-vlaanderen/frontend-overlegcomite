import Model, { hasMany, attr } from '@ember-data/model';

export default class CaseModel extends Model {
  @attr('string') identifier;
  @hasMany('agendaitem') agendaItems;
}
