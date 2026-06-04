// Copied from @appuniversum/ember-appuniversum
// https://github.com/appuniversum/ember-appuniversum/blob/master/appuniversum/src/components/au-link.gts
//
import Component from '@glimmer/component';
import linkToModels from '@appuniversum/ember-appuniversum/private/helpers/link-to-models';

const SKIN_CLASSES = {
  primary: 'au-c-link',
  secondary: 'au-c-link au-c-link--secondary',
  bold: 'au-c-link au-c-link--bold',
  button: 'au-c-button au-c-button--primary',
  'button-secondary': 'au-c-button au-c-button--secondary',
  'button-naked': 'au-c-button au-c-button--naked',
};

export default class OcLink extends Component {
  linkToModels = linkToModels;

  get skinClass() {
    return this.args.skin ? SKIN_CLASSES[this.args.skin] : SKIN_CLASSES.primary;
  }

  get widthClass() {
    if (this.args.width === 'block')
      if (this.args.skin?.startsWith('button')) return 'au-c-button--block';
      else return 'au-c-link--block';
    else return '';
  }

  get activeClass() {
    if (this.args.active) return 'is-active';
    else return '';
  }

  // this is a workaround for https://github.com/emberjs/ember.js/issues/19693
  get queryParams() {
    if (this.args.query) {
      return this.args.query;
    } else {
      return {};
    }
  }

  get isIconLeft() {
    return !!this.args.icon && this.iconAlignment === 'left';
  }

  get isIconRight() {
    return !!this.args.icon && this.iconAlignment === 'right';
  }

  get iconAlignment() {
    if (this.args.iconAlignment) return this.args.iconAlignment;
    else return 'left';
  }

  get iconOnlyClass() {
    if (this.args.icon && this.args.hideText)
      if (this.args.skin && this.args.skin.startsWith('button'))
        return 'au-c-button--icon-only';
      else return 'au-c-link--icon-only';
    return '';
  }
 }

