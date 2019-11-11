import Component from '@glimmer/component';

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

  close() {
    this.onClose(...arguments);
  }

}
