import Service from '@ember/service';
import { useLegacyStore } from '@warp-drive/legacy'
import { JSONAPICache } from '@warp-drive/json-api';
import { singularize, pluralize } from '@warp-drive/utilities/string';
import { processQueryResult } from '../adapters/application'

const MuHandler = {
  async request(context, next) {
    let { content } = await next(context.request);
    return processQueryResult(content)
  }
}

const LegacyStore = useLegacyStore({
   legacyRequests: true,
   cache: JSONAPICache,
   handlers: [MuHandler]
});


// export default LegacyStore
export default class StoreService extends LegacyStore {

  // request(context) {
  //   context.data.type = singularize(context.data.type);
  //   return super.request(context);
  // }
  modelFor(type) {
    return super.modelFor(singularize(type))
  }
}
