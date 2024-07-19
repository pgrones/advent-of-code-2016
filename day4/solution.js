import { input } from "./input.js";

const rooms = input.split("\n").map((x) => {
  const [name, id, checksum] = [
    ...x.matchAll(/([a-z-]+)(\d+)\[([a-z]+)/g),
  ][0].slice(1);

  return {
    name: name.replaceAll("-", ""),
    id: parseInt(id),
    checksum,
    fullName: name.substring(0, name.length - 1),
  };
});

let sum = 0;
const realRooms = [];

for (const room of rooms) {
  if (!room.checksum.split("").every((x) => room.name.includes(x))) continue;

  const lettersByOccurrences = new Map();
  for (const letter of room.name) {
    lettersByOccurrences.set(
      letter,
      (lettersByOccurrences.get(letter) ?? 0) + 1
    );
  }

  const mostCommonLetters = new Map();
  for (const [key, value] of [...lettersByOccurrences.entries()].toSorted(
    ([, valueA], [, valueB]) => valueB - valueA
  )) {
    if (mostCommonLetters.size === 5 && !mostCommonLetters.has(value)) break;

    mostCommonLetters.set(
      value,
      [...(mostCommonLetters.get(value) ?? []), key].toSorted()
    );
  }

  let checksum = "";
  for (const [, letters] of [...mostCommonLetters.entries()].toSorted(
    ([keyA], [keyB]) => keyB - keyA
  )) {
    checksum += letters.slice(0, 5 - checksum.length).join("");
  }

  if (checksum === room.checksum) {
    sum += room.id;
    realRooms.push({ name: room.fullName, id: room.id });
  }
}

console.log(sum);

for (const realRoom of realRooms) {
  for (let i = 0; i < realRoom.name.length; i++) {
    if (realRoom.name[i] === "-") {
      realRoom.name =
        realRoom.name.substring(0, i) + " " + realRoom.name.substring(i + 1);
      continue;
    }

    let charCode = realRoom.name.charCodeAt(i) + (realRoom.id % 26);

    if (charCode > "z".charCodeAt(0)) charCode -= 26;

    realRoom.name =
      realRoom.name.substring(0, i) +
      String.fromCharCode(charCode) +
      realRoom.name.substring(i + 1);
  }
}

console.log(realRooms.find((x) => x.name.includes("north")).id);
