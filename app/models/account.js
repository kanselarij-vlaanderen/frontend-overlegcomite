import Model, { attr, belongsTo } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default Model.extend({
	user: belongsTo('user'),
	voId: attr('string'),
	provider: attr(),

  gebruiker: alias('user') // Depended on by @lblod/ember-mock-login
});
