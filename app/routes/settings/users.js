import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import { service } from '@ember/service';
import buildFuzzySearchFilter from '../../utils/build-fuzzy-search-filter';

export default class SettingsUsersRoute extends Route {
  @service store;

  queryParams = {
    sort: { refreshModel: true },
    page: { refreshModel: true },
    size: { refreshModel: true },
    filter: { refreshModel: true },
  };

  model(params) {
    const options = {
      sort: params.sort,
      page: {
        number: params.page,
        size: params.size,
      },
      include: [
        'memberships.organization',
        'memberships.role',
        'status',
      ].join(',')
    };

    if (isPresent(params.filter)) {
      Object.assign(
        options,
        buildFuzzySearchFilter(params.filter, ['first-name', 'last-name', 'email'])
      );
    }

    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    return this.store.query('user', options);
  }

  @action
  loading(transition) {
    // eslint-disable-next-line ember/no-controller-access-in-routes
    const controller = this.controllerFor(this.routeName);
    controller.isLoadingModel = true;
    transition.promise.finally(() => {
      controller.isLoadingModel = false;
    });
    return true;
  }
}
