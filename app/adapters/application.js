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

  if (Array.isArray(data)) {
    result.data = data.map(processObject)
  } else {
    result.data = processObject(data)
  }

  return result;
}

function processObject(obj) {
  obj.type = singularize(obj.type);
  obj.attributes = camelizeKeys(obj.attributes);
  // TODO: links
  obj.relationships = {};
  return obj
}

function camelizeKeys(obj) {
  let newObj = {};
  Object.getOwnPropertyNames(obj).forEach(key => {
    newObj[camelize(key)] = obj[key];
  })
  return newObj;
}
