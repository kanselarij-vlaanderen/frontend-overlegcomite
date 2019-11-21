import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';

export default class KaleidosDocumentCardComponent extends Component {
  @tracked accordionOpen = false;
  @tracked editingName = false;
  @tracked editable = false;

  constructor() {
    super(...arguments);
    if (this.args.editable !== undefined) {
      this.editable = this.args.editable;
    }
  }

  toggleAccordion() {
    this.accordionOpen = !this.accordionOpen;
  }

  toggleEditingName() {
    this.editingName = !this.editingName;
  }
}
