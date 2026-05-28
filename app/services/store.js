import { useLegacyStore } from '@warp-drive/legacy';
import { JSONAPICache } from '@warp-drive/json-api';
import Meetings from '../schemas/meetings';
import DatetimeTransform  from '../transforms/datetime';

const JsonApiHeaderHandler = {
  request(context, next) {
    const { request } = context;
    const updatedHeaders = request.headers.clone();
    updatedHeaders.set('Content-Type', 'application/vnd.api+json');
    request.headers = updatedHeaders;
    return next(request);
  }
};

const legacyStore = useLegacyStore({
  linksMode: false,
  legacyRequests: true,
  modelFragments: true,
  cache: JSONAPICache,
  handlers: [
    JsonApiHeaderHandler,
  ],
  schemas: [
    Meetings
  ],
  transformations: [
    DatetimeTransform.create(),
  ]
});

export default legacyStore;
