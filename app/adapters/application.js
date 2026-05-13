import { JSONAPIAdapter } from '@warp-drive/legacy/adapter/json-api';
import { singularize, camelize } from '@warp-drive/utilities/string';

export default class ApplicationAdapter extends JSONAPIAdapter {
  handleResponse(_status, _headers, payload, _requestData) {
    return this.constructor.processQueryResult(payload)
  }

  static processQueryResult(result) {
    let { data, links, meta } = result;
    data = data.map(processObject)
    return { data, links, meta }
  }
}

function processObject(obj) {
  obj.type = singularize(obj.type);
  obj.attributes = camelizeKeys(obj.attributes);
  // TODO: links
  return obj
}

function camelizeKeys(obj) {
  let newObj = {};
  Object.getOwnPropertyNames(obj).forEach(key => {
    newObj[camelize(key)] = obj[key];
  })
  return newObj;
}
