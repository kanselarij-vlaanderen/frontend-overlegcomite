import Model, { attr, hasMany } from '@ember-data/model';

export default class AccountGroupModel extends Model {
  @attr() name;
  @hasMany('user') users;
}
