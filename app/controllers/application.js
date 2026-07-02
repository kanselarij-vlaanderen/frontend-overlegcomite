import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import extractErrors from '../helpers/extract-errors';

export default class ApplicationController extends Controller {
  @service currentSession;
  @service toaster;

  @action
  showError(error) {
    const errors = extractErrors(error);
    for (const error of errors) {
      this.toaster.notify(error.description, error.title, {
        type: 'error',
        icon: 'alert-circle',
        timeOut: 5000
      })
    }
  }
}
