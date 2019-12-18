import { helper } from '@ember/component/helper';
import moment from 'moment';

export default helper(function formatSubmitterNames([date, itemNumber, subItemPart]) {
  const dateString = moment(date).format('YYYY DDMM');
  const paddedItemNumber = itemNumber.toString().padStart(2, '0');
  const subItemPartStr = subItemPart ? subItemPart.toUpperCase() : '';
  return `OC ${dateString} NOT PUNT ${paddedItemNumber}${subItemPartStr}`;
});
