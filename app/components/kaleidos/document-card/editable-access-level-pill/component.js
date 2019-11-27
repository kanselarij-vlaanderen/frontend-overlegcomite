import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { get } from '@ember/object';
import { action } from '@ember/object';

export default class extends Component {
  @tracked selectedLevel;

  @tracked loading = false;
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

  @action
  cancel() {
    this.selectedLevel = this.args.selectedLevel;
    if (this.args.onCancel) {
      this.args.onCancel();
    }
    this.editing = false;
  }

  @action
  async save() {
    if (this.args.onSave) {
      this.loading = true;
      await this.args.onSave(this.selectedLevel);
      this.loading = false;
      this.editing = false;
    }
  }
}
