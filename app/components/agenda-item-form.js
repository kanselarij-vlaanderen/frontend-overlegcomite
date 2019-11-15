import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import {tracked} from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AgendaItemFormComponent extends Component {
  @service store;

  caseIdentifierRegex = /^\d{4}[A-Z]\d{5}\.\d{3}$/;

  @tracked agendaItem = null;
  @tracked caseIdentifier = "";

  constructor() {
    super(...arguments);
    this.agendaItem = this.args.agendaItem;
    const that = this;
    this.args.agendaItem.get('case').then(function(_case) {
      that.caseIdentifier = _case.identifier;
    });
  }

  validateCaseIdentifier(identifier) {
    return this.caseIdentifierRegex.test(identifier);
  }

  fetchCase(identifier) {
    return this.store.findRecord('case', {
      filter: {
        ':exact:identifier': identifier
      }
    }).then(cases => {
      return cases.firstObject;
    });
  }

  createCase(identifier) {
    return this.store.createRecord('case', {identifier: identifier});
  }

  @action
  updateCase(event) {
    this.caseIdentifier = event.target.value;
    let identifier = this.caseIdentifier;
    if (this.validateCaseIdentifier(identifier)) {
      let currentCase = this.agendaItem.case;
      return this.fetchCase(identifier).then((existingCase) => {
        if (existingCase) {
          if (currentCase && currentCase.get('isNew')) {
            currentCase.rollbackAttributes();
          }
          this.agendaItem.case = existingCase;
        } else {
          if (currentCase && currentCase.get('isNew')) {
            currentCase.identifier = identifier;
            return currentCase;
          } else {
            this.agendaItem.case = this.createCase(identifier);
          }
        }
      }).catch(() => {
        // Handle error
      });
    } else if (this.caseIdentifier === '') {
      this.agendaItem.case = null;
    }
    // If caseIdentifier-field is invalid but not empty, keep everything as is (keep existing case)
  }

  change() {
    this.args.onChange(this.agendaItem);
  }

  updateSubmitters(governmentBodies) {
    this.agendaItems.submitters = governmentBodies;
  }
}
