import { withDefaults } from '@warp-drive/core/reactive';

const MeetingsSchema = withDefaults({
  type: 'meetings',
  fields: [
    { name: 'startedAt', kind: 'field', type: 'datetime' },
    { name: 'uri', kind: 'field' }
  ]
})

export default MeetingsSchema;
