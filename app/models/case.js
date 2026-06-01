import Model, { attr, hasMany } from '@warp-drive/legacy/model';

export default class CaseModel extends Model {
  @attr('string') uri;
  @attr('string') identifier;

  @hasMany('agendaitem', { inverse: 'case', async: true }) agendaItems;
}
