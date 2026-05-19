import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { getRequestState } from '@warp-drive/ember';
import { findRecord } from '@warp-drive/utilities/json-api';

export default class MeetingRoute extends Route {
  @service store;

  async model({ meeting_id }) {
    const query = (findRecord('meeting', meeting_id));
    const { content } = await this.store.request(query);

    return content.data;
  }
}
