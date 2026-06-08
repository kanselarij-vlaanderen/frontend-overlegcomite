import versionDownloadFilename from "./download-filename";

export default function versionDownloadLink(version, contentDisposition = 'attachment') {
  const file = version.file;
  const fileName = versionDownloadFilename(version);

  return `/files/${file.id}/download?name=${encodeURIComponent(fileName)}&content-disposition=${encodeURIComponent(contentDisposition)}`;
}
