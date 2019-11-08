import DS from 'ember-data';
import { alias } from '@ember/object/computed';

const { Model, belongsTo, attr } = DS;

export default Model.extend({
	user: belongsTo('user'),
	voId: attr('string'),

  gebruiker: alias('user') // Depended on by @lblod/ember-mock-login
});
