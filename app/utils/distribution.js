import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';
import DatetimeTransform from '../transforms/datetime';

const datetimeTransform = new DatetimeTransform();

export default class Distribution {
  @tracked _hasStarted = null;
  @tracked _distributionStatus = null;
  @tracked modified = null;

  constructor(meeting, type) {
    if (!TYPES.includes(type)) {
      throw TypeError(
        `Invalid distribution type: ${type}, must be one of ${TYPES.join(', ')}`,
      );
    }
    this.meeting = meeting;
    this.type = type;
    this.endpoint = `/meetings/${this.meeting.id}/${type}/distribute`;
  }

  get hasStarted() {
    return this._hasStarted;
  }

  get distributionStatus() {
    return this._distributionStatus;
  }
  set distributionStatus(newStatus) {
    this._distributionStatus = newStatus;
    if (this.loading) {
      this.autoReload.perform();
    }
  }

  get loading() {
    return LOADING_STATUSSES.includes(this._distributionStatus);
  }
  get settled() {
    return SETTLED_STATUSSES.includes(this._distributionStatus);
  }
  get finished() {
    return this._distributionStatus === STATUSSES.FINISHED;
  }
  get failed() {
    return this._distributionStatus === STATUSSES.FAILED;
  }

  fetchStatus = task(
    {
      keepLatest: true,
    },
    async () => {
      const res = await fetch(this.endpoint);

      switch (res.status) {
        case 200:
        case 406: {
          const body = await res.json();
          this.distributionStatus = body.data.status;
          this.modified = datetimeTransform.deserialize(body.data.modified);
          this._hasStarted = true;
          break;
        }
        case 404: {
          this.distributionStatus = null;
          this._hasStarted = false;
          break;
        }
        default: {
          throw new Error(
            `Unexpected response status: ${res.status} ${res.statusText}`,
          );
        }
      }

      return this.distributionStatus;
    },
  );

  autoReload = task(
    {
      drop: true,
    },
    async () => {
      while (this.loading) {
        await timeout(10000);
        await this.fetchStatus.perform();
      }
    },
  );

  async runDistribution() {
    const res = await fetch(this.endpoint, {
      method: 'POST',
    });

    if (res.ok) {
      const body = await res.json();
      this._hasStarted = true;
      this.distributionStatus = body.data.status;
      this.modified = datetimeTransform.deserialize(body.data.modified);
      return body.data;
    } else {
      throw new Error(
        `Unexpected response status: ${res.status} ${res.statusText}`,
      );
    }
  }
}

const STATUSSES = {
  SCHEDULED: 'scheduled',
  STARTED: 'started',
  FINISHED: 'done',
  FAILED: 'failed',
};

const SETTLED_STATUSSES = [STATUSSES.FINISHED, STATUSSES.FAILED];
const LOADING_STATUSSES = [STATUSSES.SCHEDULED, STATUSSES.STARTED];

const TYPES = ['agenda', 'notifications'];
