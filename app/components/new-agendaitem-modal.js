import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class extends Component {
  @service store;

  @tracked agendaitem;
  @tracked case;

  // TODO disable modal save button if form is not valid

  constructor() {
    super(...arguments);
    this.init.perform();
  }

  init = task(async () => {
    const latestAgendaitem = (await this.store.queryOne('agendaitem', {
      'filter[meeting][:uri:]': this.args.meeting.uri,
      sort: '-priority',
    }));

    this.case = this.store.createRecord('case', {});
    this.agendaitem = this.store.createRecord('agendaitem', {
      meeting: this.args.meeting,
      case: this.case,
      priority: (latestAgendaitem?.priority || 0) + 1,
    });
  });

  saveNewAgendaitem = task(async () => {
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    await this.case.save();
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    await this.agendaitem.save();
    await this.args.onSave(this.agendaitem, this.case);
  });

  cancelNewAgendaitem = () => {
    this.agendaitem.deleteRecord();
    this.case.deleteRecord();
    this.args.onCancel();
  }
}
