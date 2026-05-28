import { withDefaults } from '@warp-drive/core/reactive';
import dasherizeFields from '../utils/warp-drive/dasherize-schema-fields';

const MeetingsSchema = withDefaults({
  type: 'meetings',
  fields: dasherizeFields([
    { name: 'startedAt', kind: 'field', type: 'datetime', sourceKey: 'started-at' },
    { name: 'uri', kind: 'field' }
  ])
})

export default MeetingsSchema;
