import { setupTest } from 'frontend-overlegcomite/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Model | meeting', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('meeting', {});
    assert.ok(model, 'model exists');
  });
});
