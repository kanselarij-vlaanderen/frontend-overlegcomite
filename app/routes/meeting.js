import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { findRecord } from '@warp-drive/utilities/json-api';

export default class MeetingRoute extends Route {
  @service store;

  async model({ meeting_id }) {
    const query = findRecord('meeting', meeting_id, {
      include: ['agenda-items.submitters']
    });
    const response = await this.store.request(query);

    return response.content.data;
  }
}
