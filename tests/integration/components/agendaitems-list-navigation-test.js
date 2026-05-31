import { module, test } from 'qunit';
import { setupRenderingTest } from 'frontend-overlegcomite/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | agendaitems-list-navigation',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(hbs`<AgendaitemsListNavigation />`);

      assert.dom().hasText('');

      // Template block usage:
      await render(hbs`
      <AgendaitemsListNavigation>
        template block text
      </AgendaitemsListNavigation>
    `);

      assert.dom().hasText('template block text');
    });
  }
);
