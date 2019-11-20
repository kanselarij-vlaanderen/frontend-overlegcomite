import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { get } from '@ember/object';
import { action } from '@ember/object';

export default class extends Component {
  @tracked selectedLevel;

  @tracked editing = false;
  @tracked labelKey;

  constructor() {
    super(...arguments);
    this.selectedLevel = this.args.selectedLevel;
    this.labelKey = this.args.labelKey || "label";
  }

  get label() {
    return get(this.selectedLevel, this.labelKey);
  }

  @action
  toggleEditing() {
    this.editing = !this.editing;
  }

  cancel() {
    if (this.args.onCancel) {
      this.args.onCancel();
    }
    this.editing = false;
  }

  save() {
    if (this.args.onSave) {
      this.args.onSave();
    }
  }
}
