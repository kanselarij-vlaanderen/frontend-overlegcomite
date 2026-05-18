import { setupTest } from 'frontend-overlegcomite/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Transform | datetime', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const transform = this.owner.lookup('transform:datetime');
    assert.ok(transform, 'transform exists');
  });
});
