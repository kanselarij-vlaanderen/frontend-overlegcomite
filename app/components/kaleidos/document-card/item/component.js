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

  get downloadable() {
    if (typeof this.args.downloadable === 'boolean') {
      return this.args.downloadable;
    } else {
      return Boolean(this.args.downloadLink);
    }
  }

  delete() {
    if (this.args.onDelete) {
      this.args.onDelete();
    }
  }
}
