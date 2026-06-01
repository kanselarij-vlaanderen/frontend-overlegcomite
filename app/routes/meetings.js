import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MeetingsRoute extends Route {
  @service store;

  queryParams = {
    sort: { refreshModel: true },
    page: { refreshModel: true },
    size: { refreshModel: true },
  }

  model(params) {
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    return this.store.query('meeting', {
      sort: params.sort,
      'page[size]': params.size,
      'page[number]': params.page,
    });
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.isOpenNewMeetingModal = false;
    controller.newMeeting = null;
  }
}
