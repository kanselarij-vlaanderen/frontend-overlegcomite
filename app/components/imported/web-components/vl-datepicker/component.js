import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
  classNames: ['vl-input-group', 'vl-datepicker'],
  dateObjectsToEnable: null,
  datePropertyToUse: null,
  enableTime: null,
  defaultHour: null,
  defaultMinute: null,

  datesToEnable: computed('dateObjectsToEnable', function() {
    const { dateObjectsToEnable, datePropertyToUse } = this;
    return dateObjectsToEnable.map(object => {
      return moment(object.get(datePropertyToUse)).toDate();
    });
  }),

  selectedDate: computed('date', function() {
    const date = this.get('date');
    if (date) {
      return moment(date.get('firstObject')).toDate();
    } else {
      const defaultDate = moment().toDate();
      if (this.defaultHour != null && !isNaN(this.defaultHour)) {
        defaultDate.setHours(this.defaultHour);
      }
      if (this.defaultMinute != null && !isNaN(this.defaultMinute)) {
        defaultDate.setMinutes(this.defaultMinute);
      }
      return defaultDate;
    }
  }),

  actions: {
    toggleCalendar() {
      this.flatpickrRef.toggle();
    },

    dateChanged(val) {
      this.dateChanged(moment(val.get('firstObject')).toDate());
    }
  }
});
