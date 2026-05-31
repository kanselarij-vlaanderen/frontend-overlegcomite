import { withDefaults } from '@warp-drive/core/reactive';
import dasherizeFields from '../utils/warp-drive/dasherize-schema-fields';

const MeetingsSchema = withDefaults({
  type: 'meetings',
  legacy: true,
  fields: dasherizeFields([
    { name: 'uri', kind: 'field' },
    { name: 'startedAt', kind: 'field', type: 'datetime' },
    {
      name: 'agendaItems',
      kind: 'hasMany',
      type: 'agendaitems',
      options:  { async: true, inverse: 'meeting', linksMode: false }
    }
  ])
})

export default MeetingsSchema;
