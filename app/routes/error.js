import Route from '@ember/routing/route';
import { service } from '@ember/service';
import extractErrors from '../helpers/extract-errors';

export default class ErrorRoute extends Route {
  @service plausible;

  async setupController(_controller, model) {
    await Promise.allSettled(
      extractErrors(model).map((error) => {
        return this.plausible.trackEvent('Error', {
          title: error.title,
          description: error.description,
        });
      }),
    );

    return super.setupController(...arguments);
  }
}
