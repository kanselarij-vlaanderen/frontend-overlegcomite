import Route from '@ember/routing/route';
import DataTableRouteMixin from 'ember-data-table/mixins/route'; // eslint-disable-line ember/no-mixins
import AuthenticatedRouteMixin from 'frontend-overlegcomite/mixins/authenticated-route-mixin'; // eslint-disable-line ember/no-mixins
import { isEmpty } from '@ember/utils';
import search from '../../utils/mu-search';

export default class SearchRoute extends Route.extend(AuthenticatedRouteMixin, DataTableRouteMixin) {
  queryParams = {
    searchText: {
      refreshModel: true
    },
    notificationsOnly: {
      refreshModel: true,
      type: 'boolean',
    },
    size: {
      refreshModel: true,
      type: 'number'
    },
    page: {
      refreshModel: true,
      type: 'number'
    },
    sort: {
      refreshModel: true
    }
  };

  async model(params) {
    const filter = {};

    if (!isEmpty(params.searchText)) {
      const textSearchFields = ['subject', 'data'].join(',');
      filter[`:sqs:${textSearchFields}`] = params.searchText;
    }

    const endpoint = params.notificationsOnly ? 'agendaitems-by-notification' : 'agendaitems-by-documents';

    if (Object.keys(filter).length == 0) {
      filter[':sqs:title'] = '*'; // search without filter
    }

    return search(endpoint, params.page, params.size, params.sort, filter, function(item) {
      const entry = item.attributes;
      entry.id = item.id;
      return entry;
    });
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.set('searchTextBuffer', this.paramsFor('search.index').searchText || '');
  }
}
