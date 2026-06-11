import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { task, timeout } from "ember-concurrency";

export default class DistributionStatusComponent extends Component {
  get distribution() {
    return this.args.distribution;
  }

  fetchTask = task(async () => {
    const fetchStatus =  this.distribution.fetchStatus;
    await fetchStatus.perform();
    while (this.distribution.loading) {
      await timeout(10000);
      await fetchStatus.perform();
    }
  });

  constructor() {
    super(...arguments);

    this.fetchTask.perform();
  }

  willDestroy() {
    super.willDestroy(...arguments);

    this.fetchTask.cancelAll();
  }
}
