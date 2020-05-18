import Model, { belongsTo, attr } from '@ember-data/model';
import { computed } from '@ember/object';

export default Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  name: computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }),
  identifier: belongsTo('identifier'),
  emailLink: attr(),
  phoneLink: attr(),
  account: belongsTo('account'),
  group: belongsTo('account-group', { inverse: null }),
  organization: belongsTo('organization'),

  email: computed('emailLink', {
    get() {
      return this.emailLink && this.emailLink.replace(/^mailto:/, '');
    },
    set(key, value) {
      this.set('emailLink', `mailto:${value}`);
      return value;
    }
  }),
  phone: computed('phoneLink', {
    get() {
      return this.phoneLink && this.phoneLink.replace(/^tel:/, '');
    },
    set(key, value) {
      this.set('phoneLink', `tel:${value.replace(/[/ .]/, '')}`);
      return value;
    }
  }),
});
