export default function downloadFilename(document, file) {
  return `${document.name}.${file.extension}`;
}
