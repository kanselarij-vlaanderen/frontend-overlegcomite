import { module, test } from 'qunit';
import { setupTest } from 'frontend-overlegcomite/tests/helpers';

module('Unit | Controller | meeting/edit', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:meeting/edit');
    assert.ok(controller);
  });
});
