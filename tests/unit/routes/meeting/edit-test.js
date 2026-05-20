import { module, test } from 'qunit';
import { setupTest } from 'frontend-overlegcomite/tests/helpers';

module('Unit | Route | meeting/edit', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:meeting/edit');
    assert.ok(route);
  });
});
