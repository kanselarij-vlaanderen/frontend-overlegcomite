import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class extends Component {
	classNameBindings = ['args.small:vl-alert--small'];

  get typeClass() {
    const t = this.args.type;
    if (['success', 'error', 'warning'].includes(t)) {
      return `vl-alert--${t}`;
    } else {
      return null;
    }
  }

  @action
  close() {
    this.onClose(...arguments);
  }

}
