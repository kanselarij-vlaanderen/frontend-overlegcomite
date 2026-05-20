import { module, test } from 'qunit';
import { setupTest } from 'frontend-overlegcomite/tests/helpers';

module('Unit | Controller | meetings/new', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:meetings/new');
    assert.ok(controller);
  });
});
