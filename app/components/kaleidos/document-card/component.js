import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';

export default class KaleidosDocumentCardComponent extends Component {
  @tracked accordionOpen = false;

  toggleAccordion() {
    this.accordionOpen = !this.accordionOpen;
  }
}
