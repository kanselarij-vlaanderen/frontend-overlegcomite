import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
	label: attr('string'),
	altLabel: attr('string'),
	scopeNote: attr('string'),
	document: hasMany('document-version', { inverse: null }),
});
