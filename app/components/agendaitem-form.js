import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { query } from '@warp-drive/utilities/json-api'
import { caseIdentifierValid } from '../data/case/helpers';

const CASE_IDENTIFIER_REGEX = /^\d{4}[A-Z]\d{5}\.\d{3}$/;

export default class AgendaitemForm extends Component {
  // @tracked caseIdentifier;
  @service store;

  get agendaitem() {
    return this.args.agendaitem;
  }

  get governementBodies() {
    const request = this.store.request(query('government-body'));
    return request.then(({ content }) => {
      return content.data;
    });
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

  get caseIdentifierInputState() {
    const identifier = this.caseIdentifier;
    if (caseIdentifierValid(identifier)) {
      return ""
    } else {
      return "au-c-input--error"
    }
  }
}

