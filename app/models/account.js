import Model, { attr, belongsTo } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default class AccountModel extends Model {
	@belongsTo('user') user;
	@attr('string') voId;
	@attr() provider;

  @alias('user') gebruiker; // Depended on by @lblod/ember-mock-login
}
