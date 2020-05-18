// Disabled rule, because @ember/data import for transforms doesn't seem to work atm
import DS from 'ember-data'; // eslint-disable-line ember/use-ember-data-rfc-395-imports
import moment from 'moment';

export default class extends DS.DateTransform {
  serialize(date) {
    if (date instanceof Date && !isNaN(date)) {
      return moment(date).format('YYYY-MM-DDZ');
    } else {
      return null;
    }
  }
}
