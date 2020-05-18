import Route from "@ember/routing/route";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin"; // eslint-disable-line ember/no-mixins

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.findRecord("agendaitem", params.agendaitem_id);
  }
});
