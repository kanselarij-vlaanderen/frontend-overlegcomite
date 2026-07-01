import constants from '../../config/constants';

export default function latinAdverbialNumeral(documentVersion) {
  const versionNumber = documentVersion?.versionNumber;
  if (versionNumber > 1) {
    const numeral = constants.LATIN_ADVERBIAL_NUMERALS[versionNumber].toUpperCase();
    return `${numeral}`;
  } else {
    return null;
  }
}
