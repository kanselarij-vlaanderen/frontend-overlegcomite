import constants from '../config/constants';

export default function formatVersionedDocumentName(
  version,
  document
) {
  const name = document.name;
  const versionNumber = version.versionNumber;

  if (versionNumber > 1) {
    const numeral = constants.LATIN_ADVERBIAL_NUMERALS[versionNumber].toUpperCase();
    return `${name} ${numeral}`;
  } else {
    return `${name}`;
  }
}
