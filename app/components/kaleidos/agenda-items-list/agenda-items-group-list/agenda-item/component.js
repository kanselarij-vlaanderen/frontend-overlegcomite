import Component from '@glimmer/component';

export default class extends Component {
  get tagName() {
    if (this.args.mode === 'main') {
      return 'div'
    } else if (this.args.mode === 'sidebar') {
      return 'a'
    }
    return 'div'
  }
}
