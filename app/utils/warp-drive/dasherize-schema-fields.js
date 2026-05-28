import { dasherize } from '@warp-drive/utilities/string.cjs';

export default function dasherizeFields(fields) {
  return fields.map(field => ({
    ...field,
    sourceKey: field.sourceKey ?? dasherize(field.name),
  }));
}
