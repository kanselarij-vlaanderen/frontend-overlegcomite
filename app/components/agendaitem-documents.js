import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';
import formatDocumentName from '../utils/format-document-name';
import constants from '../config/constants';
import { service } from '@ember/service';

export default class AgendaitemDocuments extends Component {
  @service store;

  @tracked documentTypes = [];

  @tracked isDocumentUploadModalOpen = false;
  @tracked defaultDocumentAttrs = {};

  @tracked isNotificationUploadModalOpen = false;
  @tracked defaultNotificationAttrs = {};

  constructor() {
    super(...arguments);
    this.init.perform();
  }

  init = task(async () => {
    this.documentTypes = await this.store.queryAll('document-type', {
      sort: '-priority',
    });
    const defaultDocumentType = await this.store.findRecordByUri(
      'document-type',
      constants.DOCUMENT_TYPES.VERSLAG,
    );
    const notificationType = await this.store.findRecordByUri(
      'document-type',
      constants.DOCUMENT_TYPES.NOTIFICATIE,
    );
    const agendaitem = this.args.agendaitem;
    const meeting = await agendaitem.meeting;

    const [defaultDocumentName, defaultNotificationName] = [false, true].map(
      (isNotification) =>
        formatDocumentName({
          date: meeting.startedAt,
          priority: agendaitem.priority,
          subPriority: agendaitem.subPriority,
          isNotification,
        }),
    );

    this.defaultDocumentAttrs = {
      type: defaultDocumentType,
      name: defaultDocumentName,
    };
    this.defaultNotificationAttrs = {
      type: notificationType,
      name: defaultNotificationName,
    };
  });

  openDocumentUploadModal = () => {
    this.isDocumentUploadModalOpen = true;
  }

  @action
  async saveDocuments(newDocuments) {
    const documents = await this.args.agendaitem.documents;
    documents.push(...newDocuments);
    await this.args.agendaitem.save();
    this.isDocumentUploadModalOpen = false;
  }

  openNotificationUploadModal = () => {
    this.isNotificationUploadModalOpen = true;
  }

  @action
  async saveNotification(newNotifications) {
    const [newNotification] = newNotifications;
    this.args.agendaitem.notification = newNotification;
    await this.args.agendaitem.save();
    this.isNotificationUploadModalOpen = false;
  }
}
