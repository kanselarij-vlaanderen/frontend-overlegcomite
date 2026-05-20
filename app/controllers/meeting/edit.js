import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { getRequestState } from '@warp-drive/ember';
import { updateMeeting } from '../../data/meeting/builders';
import { cacheKeyFor } from '@warp-drive/core';

export default class MeetingEditController extends Controller {
  @service store;
  @service router;

  @tracked saveState;
  @action
  async saveMeeting() {
    const saveRequest = this.store.request(updateMeeting(this.model))
    this.saveState = getRequestState(saveRequest)
    await saveRequest;
    this.router.transitionTo('meeting');
  }

  @action
  closeModal() {
    this.store.cache.rollbackAttrs(cacheKeyFor(this.model));
    this.router.transitionTo('meeting')
  }
}
