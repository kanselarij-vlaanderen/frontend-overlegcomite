import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import CONSTANTS from 'frontend-overlegcomite/config/constants';

/**
 * @param selected {Role[]}
 * @param defaultEnableAllRoles {boolean}
 */
export default class UserRoleFilterComponent extends Component {
  @service store;

  @tracked _selected;
  @tracked options;

  get selected() {
    return this._selected ?? this.args.selected;
  }

  set selected(selected) {
    this._selected = selected;
  }

  constructor() {
    super(...arguments);

    this.loadData.perform();
  }

  @action
  toggleRole(selectedRoles) {
    this.selected = selectedRoles;
    this.args.onChange?.(this.selected);
  }

  loadData = task(async () => {
    this.options = await this.store.queryAll('role', {
      filter: {
        'concept-scheme': {
          ':uri:': CONSTANTS.CONCEPT_SCHEMES.USER_ROLES,
        },
      },
      sort: 'position',
    });
    if (this.args.defaultEnableAllRoles) {
      this.selected = this.options.slice();
      this.args.onChange?.(this.selected);
    }
  });
}
