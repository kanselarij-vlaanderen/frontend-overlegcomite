import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import { task, timeout } from 'ember-concurrency';
import { LIVE_SEARCH_DEBOUNCE_TIME } from 'frontend-overlegcomite/config/config';

export default class OrganizationFilterComponent extends Component {
  @service store;

  @tracked selected;

  constructor() {
    super(...arguments);
    this.selected = this.args.selected;
  }

  @action
  toggleSelected(organization) {
    if (this.selected.includes(organization)) {
      this.selected = this.selected.filter((item) => item !== organization);
    } else {
      this.selected = [...this.selected, organization];
    }
    this.args.onChange?.(this.selected);
  }

  search = task(async (query) => {
    if (isPresent(query)) {
      await timeout(LIVE_SEARCH_DEBOUNCE_TIME);
    }

    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    const results = await this.store.query('user-organization', {
      'filter[:or:0][name]': query,
      'filter[:or:0][identifier]': query,
      sort: 'identifier',
    });

    return results.filter((organization) => !this.selected.includes(organization));
  });
}
