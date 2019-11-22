import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Component {
  @tracked locked = false;
  @tracked editable = false;

  constructor() {
    super(...arguments);
    if (this.args.locked !== undefined) {
      this.locked = this.args.locked;
    }
    if (this.args.editable !== undefined) {
      this.editable = this.args.editable;
    }
  }

  get viewable() {
    if (typeof this.args.viewable === 'boolean') {
      return this.args.viewable;
    } else {
      return Boolean(this.args.onView);
    }
  }

  @action
  toggleLock() {
    if (this.args.onToggleLock) {
      this.args.onToggleLock();
    }
  }

  @action
  view() {
    if (this.args.onView) {
      this.args.onView();
    }
    console.debug("view clicked");
  }
}
