import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { camelize } from '@warp-drive/utilities/string';
import muSearch from '../utils/mu-search';
import DatetimeTransform from '../transforms/datetime';

const datetimeTransform = new DatetimeTransform();

export default class SearchRoute extends Route {
  @service store;

  queryParams = {
    sort: { refreshModel: true },
    page: { refreshModel: true },
    size: { refreshModel: true },
    notificationsOnly: { refreshModel: true },
    searchText: { refreshModel: true },
  };

  async model(params) {
    const index = params.notificationsOnly
      ? 'agendaitems-by-notification'
      : 'agendaitems-by-documents';
    const textSearchFields = ['subject', 'data'].join(',');

    const data = await muSearch(this.store.requestManager, {
      index,
      page: params.page,
      size: params.size,
      sort: params.sort,
      filter: {
        [`:sqs:${textSearchFields}`]: params.searchText || '*',
      },
      dataMapping(agendaitem) {
        const {
          attributes: { meetingDate },
        } = agendaitem;

        agendaitem.attributes.meetingDate =
          datetimeTransform.deserialize(meetingDate);

        return agendaitem;
      },
    });

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
