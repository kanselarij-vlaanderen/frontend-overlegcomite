import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { action } from '@ember/object';
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

  @action
  loading(transition) {
    // eslint-disable-next-line ember/no-controller-access-in-routes
    const controller = this.controllerFor(this.routeName);
    controller.isLoadingModel = true;
    transition.promise.finally(() => {
      controller.isLoadingModel = false;
    });
    return true;
  }
}
