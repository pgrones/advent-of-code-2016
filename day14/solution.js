import crypto from "crypto";

const input = "jlmsuwbz";

const createHash = (data) =>
  crypto.createHash("md5").update(data).digest("hex");

const generateKeys = (stretchBy) => {
  let possibleKeys = [];
  const keys = [];

  for (let i = 0; keys.length < 64; i++) {
    let hash = createHash(input + i);

    for (let j = 0; j < stretchBy; j++) {
      hash = createHash(hash);
    }

    possibleKeys = possibleKeys.filter((x) => x.i >= i - 1000);

    for (let x = 0; x < possibleKeys.length; x++) {
      if (new RegExp(`(${possibleKeys[x].char})\\1{4}`).test(hash)) {
        keys.push(possibleKeys[x].i);

        if (keys.length === 64) break;

        possibleKeys.splice(x, 1);
        x--;
      }
    }

    const matches = /(.)\1{2}/.exec(hash);
    if (matches) possibleKeys.push({ i, char: matches[0][0] });
  }

  console.log(keys[keys.length - 1]);
};

generateKeys(0);
generateKeys(2016);
