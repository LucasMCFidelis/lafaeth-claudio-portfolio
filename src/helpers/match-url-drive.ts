export function matchUrlDrive(url: string): string {
  // 1) Caso do formato /file/d/<ID>/
      const matchFile = url.match(/\/file\/d\/([^/]+)\//);
      if (matchFile) {
        return `https://drive.google.com/uc?id=${matchFile[1]}`;
      }

      // 2) Caso do formato open?id=<ID>
      const matchOpen = url.match(/[?&]id=([^&]+)/);
      if (matchOpen) {
        return `https://drive.google.com/uc?id=${matchOpen[1]}`;
      }

      // 3) Se não bater, retorna o original (já validado)
      return url;
}
