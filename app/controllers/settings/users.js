import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';
import { PAGE_SIZE } from '../../config/config';
import constants  from '../../config/constants';

const { USER_ACCESS_STATUSES } = constants;

export default class UsersSettingsController extends Controller {
  @service store;

  @tracked size = PAGE_SIZE.USERS;
  @tracked page = 0;
  @tracked sort = 'first-name';
  @tracked filter;

  @tracked searchTextBuffer;

  @tracked roleIds = [];
  @tracked selectedRoles = [];

  @tracked isLoadingModel = false;

  search = (e) => {
    e.preventDefault();
    this.filter = this.searchTextBuffer;
    this.page = 0;
  }

  setRoles = task(async (roles) => {
    this.roleIds = roles.map((role) => role.id);
    this.selectedRoles = roles;
    this.page = 0;
  });

  loadSelectedRoles = task(async () => {
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    const records = await Promise.all(this.roleIds.map((id) => this.store.findRecord('role', id)));
    this.selectedRoles = records.slice();
  });

  blockUser = task(async (user) => {
    const blocked = await this.store.findRecordByUri(
      'concept',
      USER_ACCESS_STATUSES.BLOCKED
    );
    user.status = blocked;
    await user.save();
  });

  unblockUser = task(async (user) => {
    const allowed = await this.store.findRecordByUri(
      'concept',
      USER_ACCESS_STATUSES.ALLOWED
    );
    user.status = allowed;
    await user.save();
  });
}
