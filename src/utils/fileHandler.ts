export async function readFileContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}