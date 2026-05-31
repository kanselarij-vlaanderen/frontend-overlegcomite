import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { getRequestState } from '@warp-drive/ember';
import { cacheKeyFor } from '@warp-drive/core';
import { updateAgendaitem } from '../../../data/agendaitem/builders';
import { createCase, updateCase } from '../../../data/case/builders';
import { updateAgendaitemCase } from '../../../data/agendaitem/helpers';
import { caseIdentifierValid } from '../../../data/case/helpers';

export default class MeetingAgendaitemEditController extends Controller {
  @service store;
  @service router;

  @tracked updateState;
  @action
  async updateAgendaitem() {
    await updateAgendaitemCase(this.store, this.model, (request) => {
      this.updateState = getRequestState(request);
      return request;
    })

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

  get formIsValid() {
    return caseIdentifierValid(this.model.case.get('identifier'))
  }
}
