import Controller from '@ember/controller';
import { warn } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import DefaultQueryParamsMixin from "ember-data-table/mixins/default-query-params";

export default class SearchController extends Controller.extend(DefaultQueryParamsMixin) {
  queryParams = {
    searchText: {
      refreshModel: true
    },
    notificationsOnly: {
      refreshModel: true,
      type: 'boolean',
    }
  };

  @tracked page = 0;
  @tracked size = 10;
  @tracked searchText;
  @tracked notificationsOnly = false;

  sizeOptions = Object.freeze([5, 10, 20, 50, 100, 200]);

  @tracked filter = {
    searchText: '',
    notificationsOnly: false
  };

  // constructor() {
  //   super(...arguments);
  //   debugger;
  //   this.filter.searchText = this.searchText;
  //   this.filter.notificationsOnly = this.notificationsOnly;
  //
  // }

  @action
  selectSize(size) {
    this.size = size;
  }

  @action
  filterAgendaitems(filter) {
    this.page = 0;
    this.searchText = filter.searchText;
    this.notificationsOnly = filter.notificationsOnly;
  }

  @action
  navigateToAgendaitem(searchEntry) {
    if (searchEntry.meetingId) {
      this.transitionToRoute('agendaitems.agendaitem', searchEntry.meetingId, searchEntry.id);
    } else {
      warn(`Agendaitem ${searchEntry.id} is not related to a meeting. Cannot navigate to detail`, { id: 'agendaitem.no-meeting' });
    }
  }
}
