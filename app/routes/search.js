import Route from '@ember/routing/route';
import DataTableRouteMixin from 'ember-data-table/mixins/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { isEmpty } from '@ember/utils';
import search from '../utils/mu-search';

export default Route.extend(AuthenticatedRouteMixin, DataTableRouteMixin, {
  queryParams: {
    searchText: {
      refreshModel: true
    },
    notificationsOnly: {
      refreshModel: true,
      type: 'boolean',
    },
    size: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    },
    sort: {
      refreshModel: true
    }
  },

  model(params) {
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
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('filter.searchText', this.paramsFor('search').searchText || '');
    controller.set('filter.notificationsOnly', this.paramsFor('search').notificationsOnly || '');
  },
});
