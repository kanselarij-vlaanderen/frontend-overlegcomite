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
}
