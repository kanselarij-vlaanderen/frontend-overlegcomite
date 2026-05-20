import { cacheKeyFor, storeFor } from '@warp-drive/core';
import { RecordStore } from '@warp-drive/core/types/symbols';
import { createRecord, updateRecord } from '@warp-drive/utilities/json-api';
import { dasherize, pluralize } from '@warp-drive/utilities/string.cjs';

export function createMuRecord(record, options) {
  const body = muRecordBody(record, options);

  const req = createRecord(record);
  req.body = JSON.stringify(body);
  req.headers.set('Content-Type', "application/vnd.api+json");
  return req
}

export function updateMuRecord(record, options) {
  const body = muRecordBody(record, { includeID: true, ...options });

  const req = updateRecord(record, { patch: true });
  req.body = JSON.stringify(body);
  req.headers.set('Content-Type', "application/vnd.api+json");
  return req
}

function muRecordBody(record, { fields, includeID }) {
  const store = storeFor(record);
  const recordData = store.cache.peek(cacheKeyFor(record))

  const attributes = Object.fromEntries(
    fields.map((field) => [
      dasherize(field), recordData.attributes[field]
    ])
  );

  const data = {
    attributes,
    type: pluralize(recordData.type)
  }

  // TODO: Maybe this should be based on the record being stale?
  if (includeID) data.id = recordData.id;

  const body = { data };
  return body;
}
