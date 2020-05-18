import Model, { hasMany, attr } from '@ember-data/model';

export default class AccessLevelModel extends Model {
  @attr('string') label;
  @attr('string') altLabel;
  @attr('string') scopeNote;
  @attr('number') priority;
	@hasMany('document-version', { inverse: null }) document;
}
