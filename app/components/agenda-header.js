import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { set, action } from '@ember/object';

export default class AgendaHeader extends Component {
  @service store;
  @service currentSession;

  statusses = {
    SCHEDULED: 'scheduled',
    STARTED: 'started',
    FINISHED: 'done',
    FAILED: 'failed'
  };

  finalStatusses = [ this.statusses.FINISHED, this.statusses.FAILED ];

  @tracked startedAgendaDistribution = false;
  @tracked startedNotificationsDistribution = false;

  constructor() {
    super(...arguments);
    const that = this;
    fetch(this.agendaDistributionEndpoint).then((res) => {
      set(that, 'startedAgendaDistribution', [200, 406].includes(res.status));
    });
    fetch(this.notificationsDistributionEndpoint).then((res) => {
      set(that, 'startedNotificationsDistribution', [200, 406].includes(res.status));
    });
  }

  get meeting () {
    return this.args.meeting;
  }

  get agendaDistributionEndpoint() {
    return `/meetings/${this.meeting.id}/agenda/distribute`;
  }

  get notificationsDistributionEndpoint() {
    return `/meetings/${this.meeting.id}/notifications/distribute`;
  }

  async createDistributionJob (endpoint) {
    let res = await fetch(endpoint);
    if ([200, 406].includes(res.status)) {
      // TODO: prompt "previously distributed. Sure you want to do it again?"
    }
    res = await fetch(endpoint, { method: 'POST' });
    return (await res.json()).data;
  }

  @action
  async releaseAgenda() {
    await this.createDistributionJob(this.agendaDistributionEndpoint);
    this.startedAgendaDistribution = true;
  }

  @action
  async releaseNotifications() {
    await this.createDistributionJob(this.notificationsDistributionEndpoint);
    this.startedNotificationsDistribution = true;
  }
}
