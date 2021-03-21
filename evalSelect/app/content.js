/*
content.js
Receives the selected text, calls functions to determine the type (hex, 
binary, base64, math). If a type is found, it calls its appropriate function
to recieve the result, then displays it on the panel.
*/

// Panel's elements
var panel, title, line, result, count, span1, span2, span3, span4;
// Final conversion
var finalTitle, finalText, finalChars, finalWords;
// Don't hide panel unless user's mouse is away
var canHide = true;
// Initial selection to check difference
var userSelects = window.getSelection();

// Wait for DOM to interact with document
document.addEventListener("DOMContentLoaded", createPanels());

// Check if user highlighted text
document.addEventListener("selectionchange", () => {
  // If not empty
  if (document.getSelection().toString()) {
    // Get selected text
    userSelects = document.getSelection();
    // Length of selection
    finalChars = userSelects.toString().length;
    finalWords = userSelects.toString().split(" ").length;
    // Translation of selection
    finalText = "...";
    selectState("useless");
    // Check type
    findType();
  }
  // Nothing selected
  else {
    if (canHide) {
      selectState("none");
    }
  }
});

/*
Try to find what type to convert from
*/
function findType() {
  // Get type

  // Math
  // If matches arithmetic pattern
  isMath = userSelects.toString().match("(?!^-)[+*/-](s?-)?");

  // Remove all unnecessary chars for conversion checks
  check = userSelects.toString().replace(/[\r\n|\r|\n:;"'-,\s]/g, "");

  // Binary
  // Number of chars that are 0/1 or anything else
  let only01 = check.match(/[0,1]/g) || "";
  let not01 = check.match(/[^0,1]/g) || "";
  // If text only contains 0s and 1s
  let checkNone = not01 === "";
  // If ratio 01:other is high (to prevent selecting more chars)
  let checkRatio = not01.length / only01.length <= 0.4 || false;
  // Final
  let isBin = (checkNone || checkRatio) && check;

  // Hex
  // If contains non-hex chars
  let hexChar = check.match(/[^0-9a-f]/gi);
  // All has to be one case
  let allLower = check.match(/[a-f]/g) ? true : false;
  let allUpper = check.match(/[A-F]/g) ? true : false;
  let oneCase = !(allLower && allUpper);
  // Has to be even (hex are in pairs)
  let even = check.length % 2 === 0 ? true : false;
  // If string passes all possible hex patterns
  let isHex = !hexChar && oneCase && even && check;

  // Base64
  // RegExr for base64
  let reStr = `^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$`;
  let reObj = new RegExp(reStr, "g");
  let isB64 = check.match(reObj) && check;

  // Apply appropriate function

  // Math
  if (isMath) {
    handleMath();
  }
  // If valid binary data
  else if (isBin) {
    // Remove all non 0/1
    let bin = check.replace(/[^0,1]/g, "");
    binToAscii(bin);
  }
  // Hex
  else if (isHex) {
    hexToAscii(check);
  }
  // Base64
  else if (isB64) {
    b64ToAscii(check);
  }
}

/*
Changes the visibility of the panel
*/
function selectState(state) {
  if (state === "none") {
    panel.classList.add("conv-hide");
    count.classList.add("conv-hide");
  } else if (state === "useless") {
    // Top right
    title.classList.add("conv-hide");
    line.classList.add("conv-hide");
    result.classList.add("conv-p-red");
    result.textContent = finalText;
    panel.classList.remove("conv-hide");

    // Bottom right
    span1.textContent = finalChars;
    span3.textContent = finalWords;
    count.classList.remove("conv-hide");
  } else if (state === "found") {
    // Top right
    title.textContent = finalTitle;
    title.classList.remove("conv-hide");
    line.classList.remove("conv-hide");
    result.classList.remove("conv-p-red");
    result.textContent = finalText;
    panel.classList.remove("conv-hide");

    // Bottom right
    span1.textContent = finalChars;
    span3.textContent = finalWords;
    count.classList.remove("conv-hide");
  }
}

// Reference
// getSelection(): https://stackoverflow.com/a/30732095
