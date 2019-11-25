import { helper } from '@ember/component/helper';
import { ACCESS_LEVEL_STYLE_BY_ID } from 'frontend-overlegcomite/config/config';

export function getAccessLevelStyle([accessLevel]) {
  return  accessLevel ? ACCESS_LEVEL_STYLE_BY_ID[accessLevel.get('id')] : null;
}

export default helper(getAccessLevelStyle);
