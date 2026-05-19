import Controller from '@ember/controller';
import { query } from '@warp-drive/utilities/json-api'
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class MeetingsController extends Controller {
  @service router;

  @tracked sort = "-started-at";
  @tracked page = 0;
  @tracked size = 10;

  get meetingsQuery() {
    return query('meeting', {
      sort: this.sort,
      "page[size]": this.size,
      "page[number]": this.page
    })
  }

  @action
  goToMeeting(meeting) {
    // We need to add empty query params to prevent the router from looking for
    // queryParams in meeting, which would trigger a trap in the proxy object.
    this.router.transitionTo('meeting', meeting, { queryParams: {}});
  }
}
