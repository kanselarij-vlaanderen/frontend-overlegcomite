import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { query } from '@warp-drive/utilities/json-api';

export default class MeetingsRoute extends Route {
  @service store;

  queryParams = {
    sort: { refreshModel: true },
    page: { refreshModel: true },
    size: { refreshModel: true },
  }

  model(params) {
    return this.store.request(query('meeting', {
      sort: params.sort,
      'page[size]': params.size,
      'page[number]': params.page,
    }));
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.isOpenNewMeetingModal = false;
  }
}
