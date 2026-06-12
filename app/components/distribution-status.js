import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class DistributionStatusComponent extends Component {
  get distribution() {
    return this.args.distribution;
  }

  constructor() {
    super(...arguments);

    this.distribution.fetchStatus.perform();
  }

  willDestroy() {
    super.willDestroy(...arguments);

    this.distribution.autoReload.cancelAll();
  }
}
