import Route from '@ember/routing/route';
import { service } from '@ember/service';
import CONSTANTS from 'frontend-overlegcomite/config/constants';

export default class MockLoginRoute extends Route {
  @service session;
  @service store;
  @service router;

  beforeModel() {
    this.session.prohibitAuthentication('index');

    if (this.session.isAuthenticated) {
      this.router.transitionTo('index');
    }
  }

  model() {
    return this.store.queryAll('account', {
      include: 'user',
      filter: {
        provider: CONSTANTS.SERVICE_PROVIDERS.MOCK_LOGIN,
      },
      sort: 'user.memberships.role.position,user.first-name,user.last-name',
    });
  }
}
