/*
evalMath.js
Evaluates a selected mathematical expression and displays the result on the box.
*/

/*
Evaluates the given mathematical expression and returns the result
*/
function evalExp(obj) {
  try {
    return Function('"use strict";return (' + obj + ")")();
  } catch (err) {
    return false;
  }
}

/*
Determines whether the given text is a mathematical expression, if so, calls
to evaluate it.
*/
function handleMath() {
  validExp = userSelects.toString().replace(/,/g, "");
  let result = evalExp(`{ans:(${validExp})}`);
  if (result) {
    finalTitle = "math";
    finalText = result.ans;
    selectState("found");
  }
}

// Reference
// safe eval: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!
