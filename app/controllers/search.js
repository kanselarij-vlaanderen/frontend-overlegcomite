import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

const SEARCH_DEBOUNCE = 1000;

export default class SearchController extends Controller {
  @tracked sort = '-meeting-date';
  @tracked page = 0;
  @tracked size = 20;
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
      await timeout(SEARCH_DEBOUNCE);
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
        duration: SEARCH_DEBOUNCE,
        iterations: 1,
      },
    );
  }
}
