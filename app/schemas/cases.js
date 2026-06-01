import { withDefaults } from '@warp-drive/legacy/model/migration-support';
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
      options:  { async: false, inverse: 'case', linksMode: true }
    }
  ])
})

export default CasesSchema;
