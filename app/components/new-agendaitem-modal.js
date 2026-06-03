import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';
import { caseIdentifierValid, caseIdentifierValidStrict } from '../utils/case-identifier-validation';
import saveCaseIdentifier from '../utils/save-case-identifier';

export default class extends Component {
  @service store;

  @tracked agendaitem;
  @tracked caseIdentifier;

  get saveButtonDisabled() {
    return this.init.isRunning || !this.formValid;
  }

  get formValid() {
    return caseIdentifierValid(this.caseIdentifier);
  }

  constructor() {
    super(...arguments);
    this.init.perform();
  }

  init = task(async () => {
    const latestAgendaitem = (await this.store.queryOne('agendaitem', {
      'filter[meeting][:uri:]': this.args.meeting.uri,
      sort: '-priority',
    }));

    this.agendaitem = this.store.createRecord('agendaitem', {
      meeting: this.args.meeting,
      priority: (latestAgendaitem?.priority || 0) + 1,
    });
  });

  saveNewAgendaitem = task(async () => {
    await saveCaseIdentifier(this.store,this.agendaitem, this.caseIdentifier)
    // eslint-disable-next-line warp-drive/no-legacy-request-patterns
    await this.agendaitem.save();
    await this.args.onSave(this.agendaitem, this.agendaitem.case);
  });

  cancelNewAgendaitem = () => {
    this.agendaitem.deleteRecord();
    this.args.onCancel();
  }
}
