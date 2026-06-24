import versionDownloadFilename from "./download-filename";

export default function versionDownloadLink(document, file, contentDisposition = 'attachment') {
  const fileName = versionDownloadFilename(document, file);

  return `/files/${file.id}/download?name=${encodeURIComponent(fileName)}&content-disposition=${encodeURIComponent(contentDisposition)}`;
}
