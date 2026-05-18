import { withDefaults } from '@warp-drive/legacy/model/migration-support';

export const MeetingSchema = withDefaults({
  type: 'meeting',
  fields: [
    { kind: 'field', name: 'startedAt', type: 'datetime' },
    { kind: 'field', name: 'uri' }
  ]
})
