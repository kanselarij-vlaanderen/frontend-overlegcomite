import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { NOTIFICATION_TYPE_ID } from 'frontend-overlegcomite/config/constants';
import { alias } from '@ember/object/computed';
import { action } from "@ember/object";

export default class IndexAgendaitemsAgendaitemController extends Controller {
  addingDocuments = false;
  addingNotification = false;

  @alias('model.meeting') meeting;

  loading = false;

  @service currentSession;
  @service store;

  constructor() {
    super(...arguments);
    const notificationType = this.store.findRecord('document-type', NOTIFICATION_TYPE_ID);
    this.set('notificationType', notificationType);
  }

  @action
  async addDocuments(documents) {
    this.set('loading', true);
    this.model.documents.pushObjects(documents);
    await this.model.save();
    this.set('addingDocuments', false);
    this.set('loading', false);
  }

  @action
  async addNotification([document]) {
    this.set('loading', true);
    this.set('model.notification', document);
    await this.model.save();
    this.set('addingNotification', false);
    this.set('loading', false);
  }

  @action
  async deleteDocument(document) {
    this.model.documents.popObject(document);
    await this.model.save();
  }
}
