import Controller from "@ember/controller";
import DefaultQueryParamsMixin from "ember-data-table/mixins/default-query-params";
import { inject as service } from '@ember/service';

export default Controller.extend(DefaultQueryParamsMixin, {
  creatingNewSession: false,
  sort: "-started-at",
  size: 10,

  currentSession: service(),

  actions: {
    updateModel() {
      this.get("model").update();
    }
  }
}
);
