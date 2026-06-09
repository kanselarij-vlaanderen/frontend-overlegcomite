import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { camelize } from '@warp-drive/utilities/string';
import muSearchRequest from '../utils/mu-search-request';

export default class SearchRoute extends Route {
  @service store;

  queryParams = {
    sort: { refreshModel: true },
    page: { refreshModel: true },
    size: { refreshModel: true },
    notificationsOnly: { refreshModel: true },
    searchText: { refreshModel: true },
  }

  async model(params) {
    const index = params.notificationsOnly ? 'agendaitems-by-notification' : 'agendaitems-by-documents';

    const queryParams =  {
      'page[size]': params.size ?? 10,
      'page[number]': params.page ?? 0,
    }

    if (params.sort) {
      queryParams[`sort[${camelize(stripSort(params.sort))}]`] = sortOrder(params.sort)
    }

    const textSearchFields = ['subject', 'data'].join(',');
    queryParams[`filter[:sqs:${textSearchFields}]`] = params.searchText || '*';

    const request = muSearchRequest('agendaitem', index, queryParams)

    const response = await (await fetch(request)).json();

    const data = response.data.map((agendaitem) => {
        const { attributes: { meetingDate }} = agendaitem;

        agendaitem.attributes.meetingDate =
          meetingDate && Temporal.Instant
            .from(meetingDate)
            .toZonedDateTimeISO(Temporal.Now.timeZoneId());

        return agendaitem;
      });

    const lastPage = Math.floor(response.count / params.size);

    data.meta = {
      count: response.count,
      pagination: {
        first: { number: 0 },
        last: { number: lastPage },
      },
    }

    if (params.page > 0) {
      data.meta.pagination.prev = {
        number: params.page - 1,
      };
    }

    if (params.page < lastPage) {
      data.meta.pagination.next = {
        number: params.page + 1,
      };
    }

    return { data };
  }
}

function sortOrder(sort) {
  if (sort.startsWith('-')) {
    return 'desc';
  } else if (sort.length > 0) {
    return 'asc';
  } else {
    return null;
  }
}

function stripSort(sort) {
  return sort.replace(/(^\+)|(^-)/g, '');
}
