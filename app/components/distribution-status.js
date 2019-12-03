import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';
import { isNotFoundResponse } from 'ember-fetch/errors';
import { task, timeout } from 'ember-concurrency';

export default class extends Component {
  @tracked distributionStatus = null;

  statusses = {
    SCHEDULED: 'scheduled',
    STARTED: 'started',
    FINISHED: 'done',
    FAILED: 'failed'
  };

  finalStatusses = [ this.statusses.FINISHED, this.statusses.FAILED ];

  constructor() {
    super(...arguments);
    this.monitorJobProgress.perform();
  }


  get statusStyle () {
    if (this.distributionStatus === this.statusses.FINISHED) {
      return 'vlc-agenda-meta__status--positive';
    } else if (this.distributionStatus === this.statusses.FAILED) {
      return 'vlc-agenda-meta__status--warning';
    } else {
      return '';
    }
  }

  get icon () {
    if (this.distributionStatus === this.statusses.FINISHED) {
      return 'check-small';
    } else if (this.distributionStatus === this.statusses.FAILED) {
      return 'alert-triangle';
    } else {
      return null;
    }
  }

  get statusText () {
    if (this.distributionStatus === this.statusses.FINISHED) {
      return 'vrijgegeven';
    } else if (this.distributionStatus === this.statusses.FAILED) {
      return 'vrijgeven mislukt';
    } else if ([this.statusses.STARTED, this.statusses.SCHEDULED].includes(this.distributionStatus)) {
      return 'in vrijgave';
    } else {
      return null;
    }
  }

  get loading () {
    return [this.statusses.STARTED, this.statusses.SCHEDULED].includes(this.distributionStatus);
  }

  @(task(function * () {
    while (!this.finalStatusses.includes(this.distributionStatus)) {
      let res = yield fetch(this.args.endpoint);
      if ([200, 406].includes(res.status)) {
        this.distributionStatus = (yield res.json()).data.status;
      }
      yield timeout(10000);
    }
  })) monitorJobProgress;

}
