import { withDefaults } from '@warp-drive/core/reactive';
import dasherizeFields from '../utils/warp-drive/dasherize-schema-fields';

const GovernmentBodiesSchema = withDefaults({
  type: 'government-bodies',
  legacy: true,
  fields: dasherizeFields([
    { name: 'uri', kind: 'field' },
    { name: 'name', kind: 'field' },
    { name: 'bindingStart', kind: 'field', type: 'datetime' }
  ])
})

export default GovernmentBodiesSchema;
