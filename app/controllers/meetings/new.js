import Controller from '@ember/controller';
import { service } from "@ember/service";
import { action } from '@ember/object';
import { createMeeting } from '../../data/meeting/builders';
import { tracked } from '@glimmer/tracking';
import { getRequestState } from '@warp-drive/ember';

export default class MeetingsNewController extends Controller {
  @service store;
  @service router;

  @tracked saveState;

  @action
  async saveMeeting() {
    const saveRequest = this.store.request(createMeeting(this.model))
    this.saveState = getRequestState(saveRequest)
    const { content } = await saveRequest;
    const meeting = content.data;
    // We need to add empty query params to prevent the router from looking for
    // queryParams in meeting, which would trigger a trap in the proxy object.
    this.router.transitionTo('meeting', meeting, { queryParams: {}});
  }
}
