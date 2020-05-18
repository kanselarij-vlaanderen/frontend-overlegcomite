import Model, { belongsTo, attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') firstName;
  @attr('string') lastName;
  get name () {
    return `${this.firstName} ${this.lastName}`;
  }
  @belongsTo('identifier') identifier;
  @attr() emailLink;
  @attr() phoneLink;
  @belongsTo('account') account;
  @belongsTo('account-group', { inverse: null }) group;
  @belongsTo('organization') organization;

  get email () {
    return this.emailLink && this.emailLink.replace(/^mailto:/, '');
  }
  set email (value) {
    this.emailLink = `mailto:${value}`;
    return value;
  }
  get phone () {
    return this.phoneLink && this.phoneLink.replace(/^tel:/, '');
  }
  set phone (value) {
    this.phoneLink = `tel:${value.replace(/[/ .]/, '')}`;
    return value;
  }
}
