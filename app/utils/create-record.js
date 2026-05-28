import { recordIdentifierFor } from '@warp-drive/core';
import { createRecord, serializeResources } from '@warp-drive/utilities/json-api';

export default async function muCreateRecord(store, type, pojo) {
  const record = store.createRecord(type, pojo);
  const request = createRecord(record);
  const identifier = recordIdentifierFor(record);
  const body = serializeResources(store.cache, identifier);
  delete body.data.id;
  delete body.data.lid;
  request.body = JSON.stringify(body);
  const response = await store.request(request);
  return response.content.data;
}
