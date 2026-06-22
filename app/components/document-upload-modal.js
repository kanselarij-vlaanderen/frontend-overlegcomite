import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import { trackedArray } from '@ember/reactive/collections';
import { FILE_UPLOAD_ENDPOINT } from '../config/config';

export default class DocumentUploadModal extends Component {
  endpoint = FILE_UPLOAD_ENDPOINT;

  @service store;

  @tracked documents = trackedArray([]);
  @tracked documentTypes = [];

  constructor() {
    super(...arguments);
    this.init.perform();
  }

  init = task(async () => {
    this.documentTypes = (await this.store.queryAll('document-type', {
      sort: '-priority',
    })).toArray();
  });

  @action
  async createDocument(id) {
    const file = await this.store.findRecord('file', id);
    const now = Temporal.Now.zonedDateTimeISO();
    const documentVersion = this.store.createRecord('document-version', {
      created: now,
      file,
      versionNumber: 1,
    });
    const documentAttributes = Object.assign(
      {
        created: now,
        name: file.filenameWithoutExtension,
        documentVersions: [documentVersion],
      },
      this.args.defaultDocumentAttrs || {},
    );
    const document = this.store.createRecord('document', documentAttributes);
    this.documents.push(document);
  }

  saveDocuments = task(async () => {
    const documents = this.documents;
    this.documents = trackedArray([]);

    await Promise.all(
      documents.flatMap(async (document) => {
        await document.save();
        return (await document.documentVersions).map(async (version) => {
          return version.save();
        });
      }),
    );

    await this.args.onSave(documents);
  });

  @action
  async cancelDocuments() {
    // Destroy temporary records
    // (This is done a best effort basis, as it is not guaranteed this function
    // will run (correctly))
    await Promise.allSettled(
      this.documents.map(async (document) => {
        await Promise.allSettled(
          document.documentVersions.map(async (version) => {
            await (await version.file).destroyRecord();
            await version.destroyRecord();
          }),
        );
        await document.destroyRecord();
      }),
    );

    // Empty documents array
    this.documents.splice(0);

    this.args.onCancel();
  }
}
