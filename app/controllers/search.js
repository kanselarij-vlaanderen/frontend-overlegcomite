import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';
import { modifier } from 'ember-modifier';

const SEARCH_DEBOUNCE = 1000;

export default class SearchController extends Controller {
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
  set searchTextInput(newInput) {
    this._searchTextInput = newInput;
    this.updateSearchText.perform(newInput);
  }

  updateSearchText = task(
    {
      restartable: true,
    },
    async (newText) => {
      this.animateProgressBar();
      await timeout(SEARCH_DEBOUNCE);
      console.log('Searching:', newText);
      this.searchText = newText;
      this.page = 0;
    },
  );

  @tracked sort = '-meeting-date';
  @tracked page = 0;
  @tracked size = 20;

  asProgressBar = modifier((element) => {
    this.progressBar = element;
  });

  animateProgressBar() {
    this.progressBar.animate(
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
