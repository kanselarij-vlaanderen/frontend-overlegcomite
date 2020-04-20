import Controller from '@ember/controller';
import { task } from 'ember-concurrency';

export default Controller.extend({
  queryParams: ['page'],
  page: 0,
  size: 10,

  queryStore: task(function* () {
    const filter = { provider: 'https://github.com/kanselarij-vlaanderen/mock-login-service' };
    const accounts = yield this.store.query('account', {
      include: 'user,user.group',
      filter: filter,
      page: { size: this.size, number: this.page },
      sort: 'user.last-name'
    });
    return accounts;
  }),
});
