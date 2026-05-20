import Route from '@ember/routing/route';
import { service } from "@ember/service";

export default class MeetingsNewRoute extends Route {
  @service store;

  model() {
    return this.store.createRecord('meeting', {
      startedAt: Temporal.Now.zonedDateTimeISO()
        .round("hour")
        .with({ hour: 8 })
    });
  }
}
