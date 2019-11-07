import DS from 'ember-data';

const { Model, belongsTo, attr } = DS;

export default Model.extend({
	user: belongsTo('person'),
	voId: attr('string')
});
