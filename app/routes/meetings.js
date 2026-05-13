import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";
import { query } from '@warp-drive/utilities/json-api';

export default class MeetingsRoute extends Route {
  @service store;

  model() {
    return this.store.findAll('meeting');
  }
}
