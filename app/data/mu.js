import { cacheKeyFor, storeFor } from '@warp-drive/core';
import { RecordStore } from '@warp-drive/core/types/symbols';
import { createRecord } from '@warp-drive/utilities/json-api';
import { dasherize, pluralize } from '@warp-drive/utilities/string.cjs';

export function createMuRecord(record, options) {
  const body = muRecordBody(record, options)

  const req = createRecord(record)
  req.body = JSON.stringify(body)
  req.headers.set('Content-Type', "application/vnd.api+json")
  return req
}

function muRecordBody(record, { fields }) {
  const store = storeFor(record);
  const data = store.cache.peek(cacheKeyFor(record))

  const attributes = Object.fromEntries(
    fields.map((field) => [
      dasherize(field), data.attributes[field]
    ])
  );

  const body = {
    data: {
      attributes,
      type: pluralize(data.type)
    }
  };

  return body;
}
