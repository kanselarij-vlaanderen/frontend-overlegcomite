import { withDefaults } from '@warp-drive/legacy/model/migration-support';

export const CaseSchema = withDefaults({
  type: 'case',
  fields: [
    { kind: 'field', name: 'uri' },

    { kind: 'field', name: 'identifier' },

    {
      kind: 'hasMany', name: 'agendaItems', type: 'agendaitem', options: {
        inverse: 'case', linksMode: false, async: true
      }
    }
  ]
})
