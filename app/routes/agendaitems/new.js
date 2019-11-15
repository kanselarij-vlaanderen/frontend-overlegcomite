import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    const newItem = this.store.createRecord('agendaitem');
    this.modelFor('agendaitems').get('agendaItems').pushObject(newItem);
    return newItem;
  },

  renderTemplate(controller, model) {
    this.render('agendaitems.new', {
      controller: 'agendaitems.new',
      outlet: 'modal',
      into: 'agendaitems',
      model: model
    });
  },

  setupController(controller, model) {
    const governmentBodies = this.store.query('government-body', { sort: '-name'});
    controller.set('governmentBodies', governmentBodies);
    controller.set('model', model);
    controller.set('meeting', model.get('meeting'));
  }
});
