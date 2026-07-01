import Component from '@glimmer/component';

export default class DocumentCardDocumentVersionsListItemComponent extends Component {
  saveAccessLevel = async (accessLevel) => {
    this.args.documentVersion.accessLevel = accessLevel;
    await this.args.documentVersion.save();
  }

  toggleConfidential = () => {
    this.args.documentVersion.confidential = !this.args.documentVersion.confidential;
    this.args.documentVersion.save();
  }

  deleteDocumentVersion = async () => {
    const file = await this.args.documentVersion.file;
    await file.destroyRecord();
    await this.args.documentVersion.destroyRecord();
    this.args.onUpdate();
  }
}
