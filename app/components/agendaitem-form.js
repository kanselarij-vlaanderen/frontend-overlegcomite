import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class AgendaitemForm extends Component {
  // @tracked caseIdentifier;
  @service store;

  get agendaitem() {
    return this.args.agendaitem;
  }

  get caseIdentifier() {
    return this.agendaitem.case?.get('identifier') || '';
  }
  set caseIdentifier(newIdentifier) {
    if (!this.agendaitem.case.content) {
      this.agendaitem.case = this.store.createRecord('case', {
        identifier: newIdentifier
      })
    } else {
      this.agendaitem.case.content.identifier = newIdentifier;
    }
  }
}
