import Component from "@glimmer/component";
import { action } from '@ember/object';

export default class extends Component {

  get buttonClass() {
    let classes = ['vl-button', 'vl-button--narrow'];

    if (this.args.disabled) {
      classes.push('vl-button--disabled');
    } else if (this.args.loading){
      classes.push('vl-button--loading');
    } else if (this.args.buttonStyle){
      classes.push(`vl-button--${this.args.buttonStyle}`);
    }

    if (this.args.buttonIcon) {
      classes.push('vl-button--icon-before');
    }

    return classes.join(' ');
  }

  @action
  close() {
    this.args.onClose(...arguments);
  }

  @action
  cancel(e) {
    e.preventDefault();
    if (this.args.onCancel) {
      this.args.onCancel(...arguments);
    } else if (this.args.onClose) {
      this.args.onClose(...arguments);
    }
  }

  @action
  confirm() {
    this.args.onConfirm(...arguments);
  }
}
