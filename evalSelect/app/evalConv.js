/*
evalConv.js
Converts a given string in binary, hexadecimal, or base64 format and
returns it as ascii.
*/

/*
Splits a given string into smaller strings of n length
*/
function reSplit(string, n) {
  let reStr = `.{1,${n}}`;
  let reObj = new RegExp(reStr, "g");
  return string.match(reObj);
}

/*
Checks if a given string is ascii
*/
function isASCII(str) {
  return /^[\x00-\x7F]*$/.test(str);
}

/*
Converts binary to ascii
*/
function binToAscii(bin) {
  text = "";
  bin = reSplit(bin, 8);
  bin.forEach((byte) => {
    text += String.fromCharCode(parseInt(byte, 2));
  });
  finalTitle = "bin";
  finalText = text;
  selectState("found");
}

/*
Converts hex to ascii
*/
function hexToAscii(hex) {
  text = "";
  hex = reSplit(hex, 2);
  hex.forEach((pair) => {
    text += String.fromCharCode(parseInt(pair, 16));
  });
  finalTitle = "hex";
  finalText = text;
  selectState("found");
}

/*
Converts base64 to ascii
*/
function b64ToAscii(b64) {
  base64 = atob(b64);
  if (isASCII(base64)) {
    finalTitle = "b64";
    finalText = atob(b64);
    selectState("found");
  }
}
// Reference
// b64 regex: https://stackoverflow.com/a/8571649
