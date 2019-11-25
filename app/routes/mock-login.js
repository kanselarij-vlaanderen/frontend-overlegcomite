import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  queryParams: {
    page: {
      refreshModel: true
    }
  },
  session: service(),
  store: service(),
  beforeModel() {
    if (this.session.isAuthenticated)
      this.transitionTo('index');
  },
  model(params) {
    const filter = { provider: 'https://github.com/kanselarij-vlaanderen/mock-login-service' };
    // if (params.gemeente)
    //   filter.gebruiker = { 'achternaam': params.gemeente};
    return this.store.query('account', {
      include: 'user,user.group',
      filter: filter,
      page: { size: 10, number: params.page },
      sort: 'vo-id'
    });
  }
});
