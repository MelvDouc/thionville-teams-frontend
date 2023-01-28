function randomByte(): number {
  return Math.floor(Math.random() * 16);
}

export default function getRandomId(length: number): string {
  let randomId = "";

  while (randomId.length < length)
    randomId += randomByte().toString(16);

  return randomId;
}