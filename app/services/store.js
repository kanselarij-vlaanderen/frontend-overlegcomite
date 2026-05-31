import { useLegacyStore } from '@warp-drive/legacy';
import { JSONAPICache } from '@warp-drive/json-api';
import Meetings from '../schemas/meetings';
import Agendaitems from '../schemas/agendaitems';
import DatetimeTransform  from '../transforms/datetime';

const JsonApiHeaderHandler = {
  request(context, next) {
    const { request } = context;
    const updatedHeaders = request.headers.clone();
    updatedHeaders.set('Content-Type', 'application/vnd.api+json');
    request.headers = updatedHeaders;
    return next(request);
  }
}

const legacyStore = useLegacyStore({
  // legacyRequests: true, ? required?
  linksMode: false,
  legacyRequests: true,
  modelFragments: true,
  cache: JSONAPICache,
  handlers: [
    JsonApiHeaderHandler,
  ],
  schemas: [
    Meetings,
    Agendaitems
  ],
  transformations: [
    DatetimeTransform.create(),
  ]
});

export default legacyStore;
