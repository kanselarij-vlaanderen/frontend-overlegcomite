import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { getOwner, setOwner } from '@ember/application';
import { task, timeout } from 'ember-concurrency';
import DatetimeTransform from '../transforms/datetime';

const datetimeTransform = new DatetimeTransform();

export default class Distribution {
  @service store;

  get requestManager() {
    return this.store.requestManager;
  }

  @tracked _hasStarted = null;
  @tracked _distributionStatus = null;
  @tracked modified = null;

  constructor(meeting, type) {
    setOwner(this, getOwner(meeting));

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
      let content;

      try {
        const res = await this.requestManager.request({
          url: this.endpoint,
        });
        content = res.content;
      } catch (e) {
        if (!e.status) throw e;

        if (e.status === 406) {
          content = e.content;
        } else if (e.status === 404) {
          content = null;
        } else {
          throw e;
        }
      }

      if (content) {
        this.distributionStatus = content.data.status;
        this.modified = datetimeTransform.deserialize(content.data.modified);
        this._hasStarted = true;
      } else {
        this.distributionStatus = null;
        this._hasStarted = false;
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
    const res = await this.requestManager.request({
      url: this.endpoint,
      method: 'POST',
    });
    content = res.content;
    this._hasStarted = true;
    this.distributionStatus = content.data.status;
    this.modified = datetimeTransform.deserialize(content.data.modified);
    return content.data;
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
