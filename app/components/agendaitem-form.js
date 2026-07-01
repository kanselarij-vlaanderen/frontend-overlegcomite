import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import { service } from '@ember/service';
import { caseIdentifierValid } from '../utils/case-identifier-validation';

export default class AgendaitemForm extends Component {
  @service store;

  @tracked governmentBodies = [];

  constructor() {
    super(...arguments);
    this.fetchGovernmentBodies.perform();
  }

  get caseIdentifierValid() {
    return caseIdentifierValid(this.args.caseIdentifier);
  }

  fetchGovernmentBodies = task(async () => {
    this.governmentBodies = (
      await this.store.queryAll('government-body', {
        sort: '-name',
      })
    ).toArray();
  });
}
