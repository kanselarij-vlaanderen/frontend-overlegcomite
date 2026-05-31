import { withDefaults } from '@warp-drive/core/reactive';
import dasherizeFields from '../utils/warp-drive/dasherize-schema-fields';

const AgendaitemsSchema = withDefaults({
  type: 'agendaitems',
  legacy: true,
  fields: dasherizeFields([
    { name: 'uri', kind: 'field' },
    { name: 'subject', kind: 'field' },
    { name: 'priority', kind: 'field' },
    { name: 'subPriority', kind: 'field' },
    {
      name: 'meeting',
      kind: 'belongsTo',
      type: 'meetings',
      options:  { async: true, inverse: 'agendaItems', linksMode: false }
    },
    {
      name: 'case',
      kind: 'belongsTo',
      type: 'cases',
      options:  { async: true, inverse: 'agendaItems', linksMode: false }
    }
  ])
})

export default AgendaitemsSchema;
