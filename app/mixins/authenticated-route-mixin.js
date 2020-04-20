import Mixin from '@ember/object/mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from 'frontend-overlegcomite/config/environment';

export default Mixin.create(AuthenticatedRouteMixin, { // eslint-disable-line ember/no-new-mixins
  authenticationRoute: ENV.APP.defaultLoginRouteName
});
