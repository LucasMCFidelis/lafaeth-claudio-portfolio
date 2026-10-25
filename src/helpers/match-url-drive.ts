/** Id of the file in a Google Drive link (/file/d/<id>/ or ?id=<id>). */
export function extractDriveFileId(url: string): string | null {
  return (
    url.match(/\/file\/d\/([^/?#]+)/)?.[1] ??
    url.match(/[?&]id=([^&#]+)/)?.[1] ??
    null
  );
}

/** Turns a Drive sharing link into the direct link of the file. */
export function matchUrlDrive(url: string): string {
  const fileId = extractDriveFileId(url);
  return fileId ? `https://drive.google.com/uc?id=${fileId}` : url;
}
