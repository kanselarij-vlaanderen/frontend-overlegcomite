import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  renderTemplate(controller, model) {
    /*
     * FIXME: In this route, when clicking "overzicht", the transition renders content in the wrong outlet.
     * (due to using renderless link component in header for this link?)
     */
    // Header
    this.render('agenda-header', {
      controller: 'meeting',
      into: 'meeting',
      outlet: 'header',
      model: model
    });
    // documents detail
    this.render('meeting.documents', {
      controller,
      into: 'meeting',
      model
    });
  }
});
