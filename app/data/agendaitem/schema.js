import { withDefaults } from '@warp-drive/legacy/model/migration-support';

export const AgendaItemSchema = withDefaults({
  type: 'agendaitem',
  fields: [
    { kind: 'field', name: 'uri' },

    { kind: 'field', name: 'subject' },
    { kind: 'field', name: 'subPriority' },
    { kind: 'field', name: 'priority', type: 'integer' },

    {
      kind: 'belongsTo', name: 'meeting', type: 'meeting', options: {
        inverse: 'agendaItems', linksMode: false, async: true
      }
    },
    {
      kind: 'belongsTo', name: 'case', type: 'case', options: {
        inverse: 'agendaItems', linksMode: false, async: true
      }
    },
    {
      kind: 'hasMany', name: 'submitters', type: 'government-body', options: {
        inverse: null, linksMode: true, async: false
      }
    },
  ]
})
