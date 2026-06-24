import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DocumentCardDocumentActionsComponent extends Component {
  @service store;

  @tracked isAddingDocumentVersion = false;

  saveAccessLevel = async (accessLevel) => {
    this.args.documentVersion.accessLevel = accessLevel;
    await this.args.documentVersion.save();
  }

  toggleConfidential = () => {
    this.args.documentVersion.confidential = !this.args.documentVersion.confidential;
    this.args.documentVersion.save();
  }

  addDocumentVersion = async (files) => {
    const [file] = files;
    const now = Temporal.Now.zonedDateTimeISO();
    const latestDocumentVersion = await this.store.queryOne('document-version', {
      'filter[document][:id:]': this.args.document.id,
      sort: '-version-number',
      include: 'access-level'
    });

    const newDocumentVersion = this.store.createRecord('document-version', {
      created: now,
      document: this.args.document,
      file,
      confidential: latestDocumentVersion.confidential,
      accessLevel: await latestDocumentVersion.accessLevel,
      versionNumber: latestDocumentVersion.versionNumber + 1,
    });
    await newDocumentVersion.save();
    this.args.onUpdate();
    this.isAddingDocumentVersion = false;
  }

  deleteDocumentVersion = async (documentVersion) => {
    const file = await documentVersion.file;
    await file.destroyRecord();
    await documentVersion.destroyRecord();
    this.args.onUpdate();
  }

  deleteDocument = async () => {
    const documentVersions = await this.store.queryAll('document-version', {
      'filter[document][:id:]': this.args.document.id,
      sort: '-version-number',
      include: 'file'
    });
    await Promise.all(documentVersions.map(this.deleteDocumentVersion));
    await this.args.document.destroyRecord();
    this.args.onUpdate();
  }
}
