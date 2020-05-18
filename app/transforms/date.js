import DateTransform from '@ember-data/serializer/transform';
import moment from 'moment';

export default class extends DateTransform {
  serialize(date) {
    if (date instanceof Date && !isNaN(date)) {
      return moment(date).format('YYYY-MM-DDZ');
    } else {
      return null;
    }
  }
}
