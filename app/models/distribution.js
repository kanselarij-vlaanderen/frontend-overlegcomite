import { tracked } from "@glimmer/tracking";
import { task } from "ember-concurrency";

export default class Distribution {
  @tracked _hasStarted = null;
  @tracked _distributionStatus = null;

  constructor(meeting, type) {
    if (!TYPES.includes(type)) {
      throw TypeError(`Invalid distribution type: ${type}, must be one of ${TYPES.join(', ')}`)
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

  fetchStatus = task({
    keepLatest: true,
  }, async () => {
    const res = await fetch(this.endpoint);

    switch (res.status) {
      case 200:
      case 406: {
        const body = await res.json();
        this._distributionStatus = body.data.status;
        this._hasStarted = true;
        break;
      }
      case 404: {
        this._distributionStatus = null;
        this._hasStarted = false;
        break;
      }
      default: {
        throw new Error(`Unexpected response status: ${res.status} ${res.statusText}`)
      }
    }

    return this.distributionStatus;
  })
}

const STATUSSES = {
  SCHEDULED: 'scheduled',
  STARTED: 'started',
  FINISHED: 'done',
  FAILED: 'failed'
}

const SETTLED_STATUSSES = [STATUSSES.FINISHED, STATUSSES.FAILED]
const LOADING_STATUSSES = [STATUSSES.SCHEDULED, STATUSSES.STARTED]

const TYPES = ["agenda", "notifications"]
