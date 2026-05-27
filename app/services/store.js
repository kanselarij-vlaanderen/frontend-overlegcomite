import { useLegacyStore } from '@warp-drive/legacy'
import { JSONAPICache } from '@warp-drive/json-api';
import Meetings from '../schemas/meetings';
import DatetimeTransform  from '../transforms/datetime';

export default useLegacyStore({
  linksMode: false,
  legacyRequests: true,
  modelFragments: true,
  cache: JSONAPICache,
  schemas: [
    Meetings
  ],
  transformations: [
    DatetimeTransform.create(),
  ]
});
