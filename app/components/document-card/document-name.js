import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class DocumentCardDocumentNameComponent extends Component {
  @tracked isEditMode = false;
  @tracked documentNameInput;

  openEditMode = () => {
    this.documentNameInput = this.args.document.name;
    this.isEditMode = true;
  }

  cancelEdit = () => {
    this.isEditMode = false;
  }

  save = task(async () => {
    this.args.document.name = this.documentNameInput;
    await this.args.document.save();
    this.isEditMode = false;
  });
}
