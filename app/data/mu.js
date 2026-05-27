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

function muRecordBody(record, options) {
  const store = options.store || storeFor(record);
  const cacheKey = cacheKeyFor(record);
  const recordData = store.cache.peek(cacheKey);

  const { fields, relations, include } = options;

  // mu-cl-resource does not support inserting included records.
  //
  // let included = [];
  // if (include) {
  //   included = Object.entries(include).map(([name, relationOptions]) => {
  //     const relation = recordData.relationships[name];
  //     const relationData = store.cache.peek(relation.data);
  //     const resourceObject = muResourceObject(relationData, relationOptions);
  //     return resourceObject;
  //   })
  // }

  const resourceObject = muResourceObject(recordData, options);

  const body = {
    data: resourceObject,
    // included
  };
  return body;
}

function muResourceObject(recordData, options) {
  const { fields, relations, include } = options;

  const attributes = Object.fromEntries(
    fields.map((field) => [
      dasherize(field), recordData.attributes[field]
    ])
  );

  const relationships = !relations ? {} : Object.fromEntries(
    relations.map((relationship) => [
      dasherize(relationship), muResourceLinkage(recordData.relationships[relationship])
    ]).filter((([_, r]) => r))
  )

  const data = {
    attributes,
    relationships,
    type: pluralize(recordData.type)
  }

  if (recordData.id) {
    data.id = recordData.id;
  } else {
    data.lid = recordData.lid
  }

  return data;
}

function muResourceLinkage(relation) {
  const data = relation?.data;
  if (!data) return {};
  let res = null;
  if (Array.isArray(data)) {
    res = data.map(muResourceIdentifier);
  } else {
    res = muResourceIdentifier(data);
  }
  return res && { data: res };
}

function muResourceIdentifier(data) {
  if (!data.id) return null;

  return {
    type: pluralize(data.type),
    id: data.id
  }
}

