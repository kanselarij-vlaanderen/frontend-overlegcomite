import { LATIN_ADVERBIAL_NUMERALS } from 'frontend-overlegcomite/config/constants';

export default function (name, versionNumber) {
  if (versionNumber > 1) {
    const numeral = LATIN_ADVERBIAL_NUMERALS[versionNumber].toUpperCase();
    return `${name} ${numeral}`;
  } else {
    return `${name}`;
  }
}
