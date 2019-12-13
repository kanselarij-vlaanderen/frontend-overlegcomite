import DS from 'ember-data';
import { computed } from '@ember/object';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  name: computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }),
  identifier: belongsTo('identifier'),
  account: belongsTo('account'),
  group: belongsTo('account-group', { inverse: null })
});
