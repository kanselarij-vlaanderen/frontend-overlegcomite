export default function versionDownloadFilename(version) {
  const documentName = version.document.name;
  const fileName = `${documentName}.${version.file.extension}`;

  return fileName;
}
