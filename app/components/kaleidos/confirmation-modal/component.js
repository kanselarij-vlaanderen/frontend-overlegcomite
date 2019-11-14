import Component from "@glimmer/component";

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

  close() {
    this.args.onClose(...arguments);
  }

  cancel() {
    if (this.args.onCancel) {
      this.args.onCancel(...arguments);
    } else {
      this.args.onClose(...arguments);
    }
  }

  confirm() {
    this.args.onConfirm(...arguments);
  }
}
