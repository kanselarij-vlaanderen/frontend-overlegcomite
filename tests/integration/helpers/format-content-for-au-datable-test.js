import { module, test } from 'qunit';
import { setupRenderingTest } from 'frontend-overlegcomite/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Helper | format-content-for-au-datable',
  function (hooks) {
    setupRenderingTest(hooks);

    // TODO: Replace this with your real tests.
    test('it renders', async function (assert) {
      this.set('inputValue', '1234');

      await render(hbs`{{format-content-for-au-datable this.inputValue}}`);

      assert.dom().hasText('1234');
    });
  }
);
