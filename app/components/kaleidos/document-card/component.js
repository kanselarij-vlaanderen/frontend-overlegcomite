import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class KaleidosDocumentCardComponent extends Component {
  @tracked accordionOpen = false;
  @tracked editingName = false;
  @tracked editable = false;

  @tracked bufferedName = '';

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

  @action
  async saveName(name) {
    await this.args.onSaveName(name);
    this.editingName = false;
  }

  @action
  toggleAccordion() {
    this.accordionOpen = !this.accordionOpen;
  }

  @action
  startEditingName() {
    this.bufferedName = this.args.name;
    this.editingName = true;
  }
}
