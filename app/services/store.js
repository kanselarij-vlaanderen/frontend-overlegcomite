import Service from '@ember/service';
import { useRecommendedStore } from '@warp-drive/core';
import { useLegacyStore } from '@warp-drive/legacy'
import { JSONAPICache } from '@warp-drive/json-api';
import { singularize, pluralize } from '@warp-drive/utilities/string';
import { processQueryResult } from '../adapters/application'

import { MeetingSchema } from '../data/meeting/schema';
import  DatetimeTransform  from '../transforms/datetime';
import { AgendaItemSchema } from '../data/agendaitem/schema';
import IntegerTransform from '../transforms/integer';
import { GovernmentBodySchema } from '../data/government-body/schema';
import { CaseSchema } from '../data/case/schema';

const MuHandler = {
  async request(context, next) {
    let { content } = await next(context.request);
    return processQueryResult(content)
  }
}

const LegacyStore = useLegacyStore({
   legacyRequests: true,
   linksMode: false,
   cache: JSONAPICache,
   handlers: [MuHandler],
   schemas: [
     AgendaItemSchema,
     CaseSchema,
     GovernmentBodySchema,
     MeetingSchema,
   ],
   transformations: [
     DatetimeTransform.create(),
     IntegerTransform.create(),
   ]
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
