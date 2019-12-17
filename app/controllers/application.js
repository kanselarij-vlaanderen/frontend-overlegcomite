import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { RIGHTLESS_USER_GROUP_ID } from 'frontend-overlegcomite/config/constants';
import { getOwner } from '@ember/application';

export default class ApplicationController extends Controller {
    @service session;
    @service currentSession;

    get rightlessUserCount() {
      // Service only gets instantiated when property is computed.
      return getOwner(this).lookup('service:rightless-user-count').count;
    }

    @action
    transitionToUsers() {
      this.transitionToRoute('user-management', { queryParams: { group: RIGHTLESS_USER_GROUP_ID } });
    }
}
