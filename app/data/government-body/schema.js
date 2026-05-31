import { withDefaults } from '@warp-drive/legacy/model/migration-support';

export const GovernmentBodySchema = withDefaults({
  type: 'government-body',
  fields: [
    { kind: 'field', name: 'uri' },

    { kind: 'field', name: 'name' },
    { kind: 'field', name: 'bindingStart', type: 'datetime' },
  ]
})
