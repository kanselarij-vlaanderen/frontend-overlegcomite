import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { RIGHTLESS_USER_GROUP_ID } from 'frontend-overlegcomite/config/constants';
import { action } from "@ember/object";

export default class RightlessUserCountService extends Service {
  @service store;

  @tracked count = 0;

  constructor () {
    super(...arguments);
    this.refresh();
  }

  @action
  refresh () {
    this.store.query('user', {
      'filter[group][:id:]': RIGHTLESS_USER_GROUP_ID,
      'filter[account][provider]': 'https://github.com/lblod/acmidm-login-service',
      page: { size: 1 }
    }).then((users) => {
      this.count = users.meta.count;
    });
  }
}
