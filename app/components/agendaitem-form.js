import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class AgendaitemForm extends Component {
  // @tracked caseIdentifier;

  get agendaitem() {
    return this.args.agendaitem;
  }
}
