import { module, test } from 'qunit';
import { setupRenderingTest } from 'frontend-overlegcomite/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | au-modal-button', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<AuModalButton />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <AuModalButton>
        template block text
      </AuModalButton>
    `);

    assert.dom().hasText('template block text');
  });
});
