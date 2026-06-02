import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import { service } from '@ember/service';

export default class AgendaitemForm extends Component {
  @service store;

  @tracked governmentBodies = [];

  constructor() {
    super(...arguments);
    this.fetchGovernmentBodies.perform();
  }

  // TODO add validation state on case identifier input

  fetchGovernmentBodies = task(async () => {
    this.governmentBodies = (await this.store.queryAll('government-body')).toArray();
  });
}
