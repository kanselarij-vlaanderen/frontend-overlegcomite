import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';
import { LIVE_SEARCH_DEBOUNCE_TIME, PAGE_SIZE } from '../config/config';

export default class SearchController extends Controller {
  @service router;

  @tracked sort = '-meeting-date';
  @tracked page = 0;
  @tracked size = PAGE_SIZE.SEARCH;
  @tracked isLoadingModel = false;
  @tracked _searchTextInput = null;
  @tracked searchText;
  @tracked notificationsOnly = false;

  get searchTextInput() {
    if (this._searchTextInput === null) {
      return this.searchText;
    } else {
      return this._searchTextInput;
    }
  }

  set searchTextInput(event) {
    this._searchTextInput = event.target.value;
    this.updateSearchText.perform(event.target.value, event.target);
  }

  setNotificationsOnly = (value) => {
    this.notificationsOnly = value;
    this.page = 0;
  }

  updateSearchText = task(
    {
      restartable: true,
    },
    async (newText, element) => {
      this.animateProgressBar(element);
      await timeout(LIVE_SEARCH_DEBOUNCE_TIME);
      this.searchText = newText;
      this.page = 0;
    },
  );

  animateProgressBar(element) {
    element.animate(
      {
        backgroundPositionX: ['0%', '100%'],
        offset: [0.05, 1],
      },
      {
        duration: LIVE_SEARCH_DEBOUNCE_TIME,
        iterations: 1,
      },
    );
  }

  goToAgendaitem = async (agendaitem) => {
    this.router.transitionTo(
      'meetings.meeting.agendaitems.agendaitem',
      agendaitem.meetingId,
      agendaitem.id
    );
  }
}
