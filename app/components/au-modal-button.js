import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
  @tracked modalOpen = false;

  @action
  openModal() {
    this.modalOpen = true;
  }

  @action
  cancelModal() {
    if (this.args.onCancel) {
      this.modalOpen = this.args.onCancel();
    } else {
      this.modalOpen = false;
    }
  }

  @action
  closeModal() {
    this.modalOpen = false;
  }
}
