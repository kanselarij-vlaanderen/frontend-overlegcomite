import Model, { attr, belongsTo, hasMany } from '@warp-drive/legacy/model';

export default class DocumentTypeModel extends Model {
  @attr('string') label;
  @attr('string') scopeNote;
  @attr('number') priority;

	@hasMany('document', { inverse: 'type', async: true }) documents;
	@hasMany('document-type', { inverse: null, async: true }) subtypes;
	@belongsTo('document-type', { inverse: null, async: true }) superType;
}
