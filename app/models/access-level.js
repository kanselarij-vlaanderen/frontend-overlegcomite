import Model, { hasMany, attr } from '@ember-data/model';

export default Model.extend({
	label: attr('string'),
	altLabel: attr('string'),
	scopeNote: attr('string'),
  priority: attr('number'),
	document: hasMany('document-version', { inverse: null }),
});
