import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import extractErrors from '../helpers/extract-errors';

export default class ApplicationController extends Controller {
  @service toaster;
  @service plausible;

  @action
  async showError(error) {
    const errors = extractErrors(error);
    await Promise.allSettled(
      errors.map((error) => {
        this.toaster.notify(error.description, error.title, {
          type: 'error',
          icon: 'alert-circle',
          timeOut: 5000,
        });

        return this.plausible.trackEvent('Error', {
          title: error.title,
          description: error.description,
        });
      }),
    );
  }
}
