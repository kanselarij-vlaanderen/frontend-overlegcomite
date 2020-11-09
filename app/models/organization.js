import Model, { hasMany, attr } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default class OrganizationModel extends Model {
  @attr() uri;
  @attr() name;
  @attr() identifier; // OVO-code
  @hasMany('user') member;

  @alias('uri') subjectPage; // Doesn't always dereference, since the SPARQL-endpoint that feeds these pages isn't kept up to date.
}
