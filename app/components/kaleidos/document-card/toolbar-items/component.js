import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

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

  toggleLock() {
    this.locked = !this.locked;
    if (this.args.onToggleLock) {
      this.args.onToggleLock(this.locked);
    }
    console.log("lock toggled");
  }

  view() {
    if (this.args.onView) {
      this.args.onView();
    }
    console.debug("view clicked");
  }
}
