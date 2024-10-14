export function keepOnlyNumbers(text: string) {
  return text.replace(/\D/g, "");
}

export function getImageUrl(filePath: string) {
  const fileName = filePath.split('\\').pop();
  return `http://localhost:8080/uploads/${fileName}`;
}