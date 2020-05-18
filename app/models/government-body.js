import Model, { attr } from '@ember-data/model';

export default class GovernmentBodyModel extends Model {
	@attr('string') name;
  @attr('date') bindingStart;
}
