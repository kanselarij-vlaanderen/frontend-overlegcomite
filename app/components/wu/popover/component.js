import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default class extends Component {
  @tracked isOpen = false;
  requiredArgs = ['alignment'];

  constructor () {
    super(...arguments);
    for (const arg of this.requiredArgs) {
      if (this.args[arg] === undefined) {
        throw new Error(`"${arg}" is a required argument`);
      }
    }
  }

  get uniqueId() {
    return guidFor(this);
  }

  get class() {
    const classes = ['vl-popover'];
    const alignmentOptions = ['left', 'center', 'right'];
    if (this.args.alignment && alignmentOptions.includes(this.args.alignment)) {
      classes.push(`vl-popover--align-${this.args.alignment}`);
    }
    if (this.args.closeable) {
      classes.push('vl-popover--closable');
    }
    if (this.isOpen) {
      classes.push('js-vl-popover--open');
    }
    return classes.join(' ');
  }

  get placement () {
    const al = this.args.alignment;
    const alignmentOptions = ['left', 'center', 'right'];
    if (al && alignmentOptions.includes(al)) {
      if (al === 'left') {
        return 'bottom-start';
      } else if (al === 'center') {
        return 'bottom';
      } else if (al === 'right') {
        return 'bottom-end';
      }
    }
  }

  get buttonText () {
    return this.args.buttonText || 'Meer opties';
  }

  @action
  close () {
    this.isOpen = false;
  }

  @action
  setOpenState (open) {
    this.isOpen = open;
  }
}
