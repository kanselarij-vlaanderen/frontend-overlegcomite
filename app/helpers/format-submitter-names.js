import { helper } from '@ember/component/helper';

export default helper(function formatSubmitterNames([submitters]) {
  const submitterNames = submitters.getEach('name');
  const multiple = submitterNames.length > 1;
  let formattedString = submitterNames.slice(0, multiple ? -1 : submitterNames.length).toArray().join(',\n')
  if (multiple) {
    formattedString = formattedString + ' en\n'  + submitterNames.objectAt(submitterNames.length - 1);
  }
  return formattedString;
});
