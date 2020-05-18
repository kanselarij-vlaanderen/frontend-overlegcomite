import Model, { hasMany, belongsTo, attr } from '@ember-data/model';

export default Model.extend({
  priority: attr('number'),
  subPriority: attr('string'),
  subject: attr('string'),

  meeting: belongsTo('meeting'),
  case: belongsTo('case'),

  submitters: hasMany('government-body'),
  meetingRecord: belongsTo('file'),
  notification: belongsTo('document'),

  documents: hasMany('document')
});
