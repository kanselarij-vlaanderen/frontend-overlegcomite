import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';
import formatDocumentName from '../utils/format-document-name';
import { NOTIFICATION_TYPE_ID } from '../config/constants';
import { service } from '@ember/service';
import { DEFAULT_MEETING_DOC_TYPE_ID } from '../config/config';

export default class AgendaitemDocuments extends Component {
  @service store;

  @tracked documentTypes = [];
  @tracked defaultDocumentAttrs = {};
  @tracked defaultNotificationAttrs = {};

  constructor() {
    super(...arguments);
    this.init.perform();
  }

  init = task(async () => {
    this.documentTypes = await this.store.queryAll('document-type', {
      sort: '-priority'
    })
    // All of these should be in cache by now
    const defaultDocumentType = await this.store.findRecord('document-type', DEFAULT_MEETING_DOC_TYPE_ID);
    const notificationType = await this.store.findRecord('document-type', NOTIFICATION_TYPE_ID);
    const agendaitem = this.args.agendaitem;
    const meeting = await agendaitem.meeting;

    const [defaultDocumentName, defaultNotificationName] = [false, true].map((notification) =>
      formatDocumentName({
        date: meeting.startedAt,
        priority: agendaitem.priority,
        subPriority: agendaitem.subPriority,
        notification
      })
    )

    this.defaultDocumentAttrs = {
      type: defaultDocumentType,
      name: defaultDocumentName
    }
    this.defaultNotificationAttrs = {
      type: notificationType,
      name: defaultNotificationName
    }
  })

  @tracked isDocumentUploadModalOpen = false;

  @action
  openDocumentUploadModal() {
    this.isDocumentUploadModalOpen = true;
  }

  @action
  async saveDocuments(newDocuments) {
    const documents = (await this.args.agendaitem.documents)
    documents.push(...newDocuments);
    await this.args.agendaitem.save();
    this.isDocumentUploadModalOpen = false;
  }

  @tracked isNotificationUploadModalOpen = false;

  @action
  openNotificationUploadModal() {
    this.isNotificationUploadModalOpen = true;
  }
}
