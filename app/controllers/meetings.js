import Controller from '@ember/controller';
import { query } from '@warp-drive/utilities/json-api'
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class MeetingsController extends Controller {
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
    console.warn('TODO: go to meeting route')
  }
}
