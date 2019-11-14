import Component from '@glimmer/component';

export default class extends Component {
  toggleLock() {
    console.log("lock toggled");
  }

  view() {
    console.log("view clicked");
  }
}
