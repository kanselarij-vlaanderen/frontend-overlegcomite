import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'frontend-overlegcomite/mixins/authenticated-route-mixin';
import DataTableRouteMixin from 'ember-data-table/mixins/route';
import _ from 'lodash';
import moment from 'moment';

export default Route.extend(AuthenticatedRouteMixin, DataTableRouteMixin, {
  modelName: "meeting",
  queryParams: {
    from: {
      refreshModel: true,
    },
    to: {
      refreshModel: true,
    },
  },

  // TODO: Move to new release of ember data table when release
  model(params) { // Overrides Jquery dependency (Ember.$) in package https://github.com/mu-semtech/ember-data-table/commit/247cfbeb94a7224b4a12e9cb6918c7180c894602
    const options = {
      sort: params.sort,
      page: {
        number: params.page,
        size: params.size
      }
    };
    // TODO: sending an empty filter param to backend returns []
    if (params.filter) { options['filter'] = params.filter; }
     _.merge(options, this.mergeQueryOptions(params));
    return this.get('store').query(this.get('modelName'), options);
  },

  mergeQueryOptions(params) {
    let options = {};
    if (params.from) {
      options['filter[:gte:started-at]'] = moment(params.from, 'YYYY-MM-DD').utc().format();
    }
    if (params.to) {
      options['filter[:lte:started-at]'] = moment(params.to, 'YYYY-MM-DD').utc().format();
    }
    return options;
  },

  actions: {
    updateModel() {
      this.get("model").update();
    },
  }
});
