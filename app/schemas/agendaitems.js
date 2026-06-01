import { withDefaults } from '@warp-drive/legacy/model/migration-support';
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
      options:  { async: false, inverse: 'agendaItems', linksMode: true }
    },
    {
      name: 'case',
      kind: 'belongsTo',
      type: 'cases',
      options:  { async: false, inverse: 'agendaItems', linksMode: true }
    },
    {
      name: 'submitters',
      kind: 'hasMany',
      type: 'government-bodies',
      options:  { async: false, inverse: null, linksMode: true }
    }
  ])
})

export default AgendaitemsSchema;
