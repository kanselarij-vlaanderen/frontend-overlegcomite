import versionDownloadFilename from "./download-filename";

export default function versionDownloadLink(version) {
  const file = version.file;
  const fileName = versionDownloadFilename(version);

  return `/files/${file.id}/download?name=${encodeURIComponent(fileName)}`;
}
