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

  // TODO: add validation on case identifier field

  get caseIdentifierInputState() {
    const identifier = this.args.agendaitem.case?.identifier;
    if (caseIdentifierValid(identifier)) {
      return ""
    } else {
      return "au-c-input--error"
    }
  }
}
