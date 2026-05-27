import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { getRequestState } from '@warp-drive/ember';
import { cacheKeyFor } from '@warp-drive/core';
import { updateAgendaitem } from '../../../data/agendaitem/builders';
import { createCase, updateCase } from '../../../data/case/builders';

export default class MeetingAgendaitemEditController extends Controller {
  @service store;
  @service router;

  @tracked updateState;
  @action
  async updateAgendaitem() {
    const case_ = this.model.case.content;
    if (case_) {
      let caseRequest;
      if (this.model.case.id) {
        caseRequest = this.store.request(updateCase(case_));
      } else {
        caseRequest = this.store.request(createCase(case_));
      }
      this.updateState = getRequestState(caseRequest);
      await caseRequest;
    }
    const updateRequest = this.store.request(updateAgendaitem(this.model))
    this.updateState = getRequestState(updateRequest)
    await updateRequest;

    this.router.transitionTo('meeting.agendaitem');
  }

  @action
  closeModal() {
    if (this.model.case.content)
      this.store.cache.rollbackAttrs(cacheKeyFor(this.model.case.content));
    this.store.cache.rollbackAttrs(cacheKeyFor(this.model));
    this.router.transitionTo('meeting.agendaitem')
  }
}
