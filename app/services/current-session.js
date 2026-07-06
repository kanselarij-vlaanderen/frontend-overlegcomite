import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { isPresent } from '@ember/utils';
import { findGroupByRole } from 'frontend-overlegcomite/config/permissions';

export default class CurrentSessionService extends Service {
  @service session;
  @service store;

  @tracked user;
  @tracked organization;
  @tracked membership;
  @tracked role;

  async load() {
    if (this.session.isAuthenticated) {
      const membershipId = this.session.data?.authenticated?.data?.relationships?.membership?.data?.id;
      if (membershipId) {
        this.membership = await this.store.findRecord('membership', membershipId, {
          include: 'role,organization,user'
        });
        const [role, organization, user] = await Promise.all([
          this.membership.role,
          this.membership.organization,
          this.membership.user
        ]);
        this.organization = organization;
        this.user = user;
        this.role = role;
      }
    }
  }

  clear() {
    this.user = null;
    this.role = null;
    this.organization = null;
    this.membership = null;
  }

  get hasAccessToApplication() {
    return this.session.isAuthenticated && isPresent(this.role);
  }

  get userGroup() {
    return this.role && findGroupByRole(this.role.uri);
  }


  may(permission) {
    if (this.userGroup) {
      return this.userGroup.permissions.includes(permission);
    } else {
      return false;
    }
  }
}
