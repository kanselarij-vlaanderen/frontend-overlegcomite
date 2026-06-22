import Route from '@ember/routing/route';
import { service } from '@ember/service';
import textToDateRange from '../utils/text-to-date-range';
import { formatDateForFilter } from '../utils/format-date-for-filter';

export default class MeetingsRoute extends Route {
  @service store;

  queryParams = {
    sort: { refreshModel: true },
    page: { refreshModel: true },
    size: { refreshModel: true },
    dateFilter: { refreshModel: true },
  }

  model(params) {
    const dateRange = textToDateRange(params.dateFilter);
    let dateParams = {};
    if (dateRange) {
      const [begin, end] = dateRange;
      dateParams = {
        'filter[:gte:started-at]': formatDateForFilter(begin),
        'filter[:lt:started-at]': formatDateForFilter(end),
      }
    }

    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    return this.store.query('meeting', Object.assign(dateParams, {
      sort: params.sort,
      'page[size]': params.size,
      'page[number]': params.page,
    }));
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.isOpenNewMeetingModal = false;
    controller.newMeeting = null;
  }
}


