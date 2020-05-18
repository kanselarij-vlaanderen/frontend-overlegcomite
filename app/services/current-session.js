import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';
import { task, waitForProperty } from 'ember-concurrency';
import rolesByGroupId from 'frontend-overlegcomite/config/roles';

export default Service.extend({
  session: service('session'),
  store: service('store'),
  async load() {
    if (this.session.isAuthenticated) {
      const session = this.session;
      const account = await this.store.find('account', get(session, 'data.authenticated.relationships.account.data.id'));
      const user = await account.get('user');
      // TODO: group management
      const group = await this.store.find('account-group', get(session, 'data.authenticated.relationships.group.data.id'));
      const roles = await get(session, 'data.authenticated.data.attributes.roles');
      this._account = account;
      this._user = user;
      this._roles = roles;
      this._group = group;

      // The naming is off, but account,user,roles are taken for the
      // promises in a currently public API.
      this.setProperties({
        accountContent: account,
        userContent: user,
        rolesContent: roles,
        groupContent: group
      });

      this.set('canAccessApplication', this.canAccess('canAccessApplication')); // TODO: Should be based on roles through canAccess()
      this.set('canEditAgenda',  this.canAccess('canEditAgenda'));
      this.set('canAccessSettings',  this.canAccess('canAccessSettings'));
    }
  },
  canAccess(role) {
    // TODO: Should be based on roles acquired trough openId
    if (this._group.id &&
      rolesByGroupId[this._group.id] &&
      typeof rolesByGroupId[this._group.id][role] === 'boolean') {
      return rolesByGroupId[this._group.id][role];
    } else {
      return false;
    }
  },
  // constructs a task which resolves in the promise
  makePropertyPromise: task(function * (property) {
    yield waitForProperty(this, property);
    return this.get(property);
  }),
  // this is a promise
  account: computed('_account', function() {
    return this.makePropertyPromise.perform('_account');
  }),
  // this contains a promise
  user: computed('_user', function() {
    return this.makePropertyPromise.perform('_user');
  }),
  // this contains a promise
  // group: computed('_group', function() {
  //   return this.makePropertyPromise.perform('_group');
  // })
});
