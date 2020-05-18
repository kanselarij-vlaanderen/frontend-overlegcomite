import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class extends Component {
  get tagName() {
    if (this.args.mode === 'main') {
      return 'div';
    } else if (this.args.mode === 'sidebar') {
      return 'a';
    }
    return 'div';
  }

  @action
  onClick() {
    if (this.args.onClick) {
      if (this.args.mode === 'sidebar') {
        this.args.onClick();
      }
    }
  }
}
