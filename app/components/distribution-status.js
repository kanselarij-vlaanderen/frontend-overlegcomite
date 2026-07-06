import Component from '@glimmer/component';

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

  get icon() {
    if (this.distribution.loading) {
      return 'clock';
    } else if (this.distribution.finished) {
      return 'check';
    } else {
      return 'circle-x';
    }
  }

  get skin() {
    if (this.distribution.loading) {
      return 'ongoing';
    } else if (this.distribution.finished) {
      return 'success';
    } else {
      return 'error';
    }
  }
}
