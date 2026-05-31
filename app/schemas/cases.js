import { withDefaults } from '@warp-drive/core/reactive';
import dasherizeFields from '../utils/warp-drive/dasherize-schema-fields';

const CasesSchema = withDefaults({
  type: 'cases',
  legacy: true,
  fields: dasherizeFields([
    { name: 'uri', kind: 'field' },
    { name: 'identifier', kind: 'field' },
    {
      name: 'agendaItems',
      kind: 'hasMany',
      type: 'agendaitems',
      options:  { async: true, inverse: 'case', linksMode: false }
    }
  ])
})

export default CasesSchema;
