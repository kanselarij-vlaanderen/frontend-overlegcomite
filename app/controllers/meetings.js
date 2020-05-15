import Controller from '@ember/controller';
import DefaultQueryParamsMixin from "ember-data-table/mixins/default-query-params"; // eslint-disable-line ember/no-mixins
import { inject as service } from '@ember/service';
import { action } from "@ember/object";
import moment from "moment";

export default class MeetingsController extends Controller.extend(DefaultQueryParamsMixin) {
  @service currentSession;

  creatingNewSession = false;
  sort = "-started-at";
  size = 10;

  dateRegex = /^(?:(\d{1,2})-)?(?:(\d{1,2})-)?(\d{4})$/;

  @action
  updateModel() {
    this.model.update();
  }

  @action
  setDateFilter(dateString) {
    const date = dateString.split('/').join('-'); // Also support slash-separated dates.
    const match = this.dateRegex.exec(date);
    if (!match) {
      this.set('from', null);
      this.set('to', null);
      return;
    }
    const min = moment(parseInt(match[3]), 'YYYY', true);
    let unitToAdd;
    if (match[1] && match[2]) {
      unitToAdd = 'day';
      min.set('date', parseInt(match[1]));
      min.set('month', parseInt(match[2]) - 1); // Count starts from 0
    } else if (match[1]) {
      unitToAdd = 'month';
      min.set('month', parseInt(match[1]) - 1);
    } else {
      unitToAdd = 'year';
    }
    const max = min.clone().add(1, unitToAdd + 's');

    this.set('from', min.format('YYYY-MM-DD'));
    this.set('to', max.format('YYYY-MM-DD'));
    this.set('page', 0);
  }

  @action
  clearDateFilter() {
    this.set('to', null);
    this.set('from', null);
  }
}
