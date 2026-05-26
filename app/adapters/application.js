import { JSONAPIAdapter } from '@warp-drive/legacy/adapter/json-api';
import { singularize, camelize } from '@warp-drive/utilities/string';

export default class ApplicationAdapter extends JSONAPIAdapter {
  handleResponse(_status, _headers, payload, _requestData) {
    return processQueryResult(payload)
  }
}

export function processQueryResult(result) {
  if (!result) return result;

  let { data } = result;

  if (data)
    if (Array.isArray(data)) {
      result.data = data.map(processObject)
    } else {
      result.data = processObject(data)
    }

  if (result.included) {
    result.included = result.included.map(processObject);
  }

  return result;
}

function processObject(obj) {
  obj.type = singularize(obj.type);
  if (obj.attributes)
    obj.attributes = mapObjectKeys(obj.attributes, camelize);
  if (obj.relationships)
    obj.relationships = Object.fromEntries(
      Object.entries(obj.relationships)
        .map(([k, v]) => [camelize(k), processQueryResult(v)]));
  return obj
}

function mapObjectKeys(o, callback) {
  return Object.fromEntries(
    Object.entries(o)
      .map(([k, v]) => [callback(k), v]))
}
