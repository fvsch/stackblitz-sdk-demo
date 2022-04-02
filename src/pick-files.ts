export function pickFile(keys: string[]): string {
  return keys[Math.floor(Math.random() * keys.length)];
}

export function pickFiles(keys: string[]): string[] {
  const paneCount = 1 + Math.floor(Math.random() * 3);

  const getPane = () => {
    const files: string[] = [];
    const tabCount = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < tabCount; i++) {
      const file = pickFile(keys);
      if (file && !files.includes(file)) files.push(file);
    }
    return files;
  };

  const panes = " "
    .repeat(paneCount)
    .split("")
    .map(() => getPane().join(","));

  return panes;
}
