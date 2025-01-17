const input = "11011110011011101";

const fold = (a) => {
  let b = a;

  b = [...b]
    .reverse()
    .map((x) => (x === "0" ? "1" : "0"))
    .join("");

  return a + "0" + b;
};

const generateChecksum = (data) => {
  let checksum = "";
  for (let i = 0; i < data.length; i += 2) {
    checksum += data[i] === data[i + 1] ? "1" : "0";
  }

  if (checksum.length % 2 === 0) return generateChecksum(checksum);

  return checksum;
};

const solve = (length) => {
  let data = input;

  while (data.length < length) {
    data = fold(data);
  }

  console.log(generateChecksum(data.substring(0, length)));
};

solve(272);
solve(35651584);
