import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import moment from 'moment';

let equalContentArrays = function(a, b) {
  if (a.length === b.length) {
    return a.every(elem => b.includes(elem));
  } else {
    return false;
  }
};

export default Controller.extend({
  routing: service('-routing'),
  currentSession: service(),
  meeting: alias('model'),

  agendaItemGroups: computed('meeting.sortedAgendaItems.@each.submitters', async function () {
    let agendaItems = this.get('meeting.sortedAgendaItems');
    if (agendaItems.length === 0) {
      return [];
    } else {
      let currentSubmittersArray = await agendaItems.firstObject.submitters;
      let currentItemArray = A([]);
      let groups = [];
      groups.pushObject(currentItemArray);
      for (var i = 0; i < agendaItems.length; i++) {
        let item = agendaItems.objectAt(i);
        let subm = await item.submitters;
        if (equalContentArrays(currentSubmittersArray, subm)) {
          currentItemArray.pushObject(item);
        } else {
          currentItemArray = A([item]);
          groups.pushObject(currentItemArray);
          currentSubmittersArray = subm;
        }
      }
      return groups;
    }
  }),

  agendaItemListMode: computed('routing.currentRouteName', function () {
    const { routing } = this;
    if (routing.get('currentRouteName').startsWith('agendaitems.agendaitem')) {
      return 'sidebar';
    } else  {
      return 'main';
    }
  }),

  agendaitemsClass: computed('agendaItemListMode', function () {
    const { agendaItemListMode } = this;
    if (agendaItemListMode === 'main') {
      return "vlc-panel-layout-agenda__detail vl-u-bg-porcelain";
    } else  {
      return "vlc-panel-layout__agenda-items";
    }
  }),

  actions: {
    releaseAgenda(meeting) {
      meeting.set('agendaReleaseTime', moment());
      meeting.save();
    },

    releaseNotifications(meeting) {
      meeting.set('notificationReleaseTime', moment());
      meeting.save();
  },

    selectAgendaItem(agendaitem) {
      this.transitionToRoute('agendaitems.agendaitem', agendaitem);
    },

    searchAgendaItems(value) {
      this.set('filter', value);
    },

    updateModel() {
      this.get('model').reload();
    },

  }
});
