import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import constants from '../config/constants';

const { ACCESS_LEVELS } = constants;

export default class AccessLevelPillComponent extends Component {
  @service store;

  @tracked accessLevelOptions = [];
  @tracked selectedAccessLevel;
  @tracked isEditMode = false;

  constructor() {
    super(...arguments);
    this.init.perform();
  }

  init = task(async () => {
    this.accessLevelOptions = (
      await this.store.queryAll('access-level', { sort: 'priority' })
    ).toArray();
  });

  get skin() {
    if (this.args.accessLevel?.uri == ACCESS_LEVELS.MINISTER) {
      return 'warning';
    } else if (this.args.accessLevel?.uri == ACCESS_LEVELS.KABINET_ADVIES) {
      return 'warning';
    } else if (this.args.accessLevel?.uri == ACCESS_LEVELS.INTERN_OVERHEID) {
      return 'default';
    } else {
      return 'default'
    }
  }

  get icon() {
    if (this.args.accessLevel?.uri == ACCESS_LEVELS.MINISTER) {
      return 'user';
    } else if (this.args.accessLevel?.uri == ACCESS_LEVELS.KABINET_ADVIES) {
      return 'circle';
    } else if (this.args.accessLevel?.uri == ACCESS_LEVELS.INTERN_OVERHEID) {
      return 'circle-full';
    } else {
      return 'minus-circle'
    }
  }

  openEditMode = () => {
    this.selectedAccessLevel = this.args.accessLevel;
    this.isEditMode = true;
  }

  cancelEdit = () => {
    this.isEditMode = false;
  }

  save = () => {
    this.isEditMode = false;
    this.args.onSave(this.selectedAccessLevel);
  }
}
