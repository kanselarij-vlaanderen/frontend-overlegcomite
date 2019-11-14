import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

export default class extends Component {
  get uniqueId() {
    return guidFor(this);
  }
}
