import Controller from '@ember/controller';
import { warn } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexSearchController extends Controller {
  sizeOptions = Object.freeze([5, 10, 20, 50, 100, 200]);

  @tracked searchText;
  @tracked page = 0;
  @tracked size = 10;
  @tracked sort = '-meeting-date';
  @tracked notificationsOnly = false;

  @tracked searchTextBuffer = '';

  @action
  navigateToAgendaitem(searchEntry) {
    if (searchEntry.meetingId) {
      this.transitionToRoute('agendaitems.agendaitem', searchEntry.meetingId, searchEntry.id);
    } else {
      warn(`Agendaitem ${searchEntry.id} is not related to a meeting. Cannot navigate to detail`, { id: 'agendaitem.no-meeting' });
    }
  }

  @action
  search (searchText) {
    this.searchText = searchText;
    this.page = 0;
    // Reloads, thanks to query param binding in route
  }
}
