import { helper } from '@ember/component/helper';
import moment from 'moment';

export default helper(function formatSubmitterNames([date, itemNumber]) {
  const dateString = moment(date).format('YYYYMMDD');
  const paddedItemNumber = itemNumber.toString().padStart(2, '0');
  return `OC ${dateString} PUNT ${paddedItemNumber}`;
});
