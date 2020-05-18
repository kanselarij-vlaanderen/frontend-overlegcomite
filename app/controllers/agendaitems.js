import { computed } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import MeetingController from 'frontend-overlegcomite/controllers/meeting';

let equalContentArrays = function(a, b) {
  if (a.length === b.length) {
    return a.every(elem => b.includes(elem));
  } else {
    return false;
  }
};

export default MeetingController.extend({
  router: service('router'),

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

  agendaItemListMode: computed('router.currentRouteName', function () {
    const { router } = this;
    if (router.get('currentRouteName').startsWith('agendaitems.agendaitem')) {
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
  })
});
