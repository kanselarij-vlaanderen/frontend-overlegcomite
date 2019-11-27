import DS from 'ember-data';
let { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  priority: attr('number'),
  subPriority: attr('string'),
  subject: attr('string'),
  distributionDate: attr('date'),

  meeting: belongsTo('meeting'),
  case: belongsTo('case'),

  submitters: hasMany('government-body'),
  meetingRecord: belongsTo('file'),
  notification: belongsTo('document'),

  documents: hasMany('document')
});
