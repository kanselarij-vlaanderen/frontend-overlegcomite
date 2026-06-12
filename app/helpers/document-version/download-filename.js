export default function versionDownloadFilename(version) {
  const documentName = version.document.get('name');
  const fileName = `${documentName}.${version.file.get('extension')}`;

  return fileName;
}
