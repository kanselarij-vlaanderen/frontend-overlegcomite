import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
  @tracked editable = false;

  constructor() {
    super(...arguments);
    if (this.args.editable !== undefined) {
      this.editable = this.args.editable;
    }
  }

  delete() {
    if (this.args.onDelete) {
      this.args.onDelete();
    }
  }
}
