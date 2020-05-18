import Model, { belongsTo, hasMany, attr } from '@ember-data/model';

export default class DocumentTypeModel extends Model {
	@attr('string') label;
	@attr('string') scopeNote;
	@attr('number') priority;

	@hasMany('document', { inverse: null }) documents;
	@hasMany('document-type', { inverse: null }) subtypes;
	@belongsTo('document-type', { inverse: null }) superType;
}
