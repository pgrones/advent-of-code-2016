import crypto from "crypto";

const input = "abbhdwsy";

const createHash = (data) =>
  crypto.createHash("md5").update(data).digest("hex");

const print = (password, secondPassword) => {
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  process.stdout.write(password + " | " + secondPassword);
};

let password = new Array(8).fill("_");
let secondPassword = new Array(8).fill("_");
let i = 0;

while (
  password.filter((x) => x !== "_").length < 8 ||
  secondPassword.filter((x) => x !== "_").length < 8
) {
  const hash = createHash(input + i);

  if (hash.startsWith("00000")) {
    const char = hash.charAt(5);

    if (password.filter((x) => x !== "_").length < 8) {
      password[password.indexOf("_")] = char;
    }

    if (/[0-7]/.test(char)) {
      const index = parseInt(char);

      if (secondPassword[index] === "_") {
        secondPassword[index] = hash.charAt(6);
      }
    }

    print(password.join(""), secondPassword.join(""));
  }

  i++;
}
