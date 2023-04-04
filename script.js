//global variables , manipulate number where working with
let operator = "";
let previousValue = "";
let currentValue = "";

document.addEventListener("DOMContentLoaded", function () {
  //store all components on html in our JS
  let clear = document.querySelector("#allClear");
  let equal = document.querySelector(".equal");
  let decimal = document.querySelector(".decimal");

  let numbers = document.querySelectorAll(".number");
  let operators = document.querySelectorAll(".operator");

  let previousScreen = document.querySelector(".previousTop");
  let currentScreen = document.querySelector(".currentLow");

  //------------------------------------------

  numbers.forEach((number) =>
    number.addEventListener("click", (e) => {
      handleNumber(e.target.textContent);
      currentScreen.textContent = currentValue;
    })
  );
  operators.forEach((op) =>
    op.addEventListener("click", (e) => {
      handleOperator(e.target.textContent);
      previousScreen.textContent = previousValue + "" + operator;
      currentScreen.textContent = currentValue;
    })
  );
  clear.addEventListener("click", (e) => {
    previousValue = "";
    currentValue = "";
    operator = "";
    previousScreen.textContent = currentValue;
    currentScreen.textContent = currentValue;
  });
  equal.addEventListener("click", function () {
    if (currentValue != "" && previousValue != "") {
      calculate();
      previousScreen.textContent = "";
      if (previousValue.length <= 5) {
        currentScreen.textContent = previousValue;
      } else {
        currentScreen.textContent = previousValue.slice(0, 5) + "...";
      }
    }
  });
  decimal.addEventListener("click", function () {
    addDecimal();
  });
});

//Outside functions-----------------------------------------

function handleNumber(num) {
  //   console.log(num);
  if (currentValue.length <= 8) {
    currentValue += num;
  }
}

function handleOperator(op) {
  operator = op;
  //currentValue += op;
  previousValue = currentValue;
  currentValue = "";
}

//calculation formula
function calculate() {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);
  if (operator === "+") {
    previousValue += currentValue;
  } else if (operator === "-") {
    previousValue -= currentValue;
  } else if (operator === "x") {
    previousValue *= currentValue;
  } else {
    previousValue /= currentValue;
  }
  previousValue = roundNumber(previousValue);
  //   console.log(previousValue);
  previousValue = previousValue.toString();
  currentValue = previousValue.toString();
}

//rounding numbers
function roundNumber(num) {
  return Math.round(num * 1000) / 1000;
}

//adding decimals
function addDecimal() {
  if (!currentValue.includes(".")) {
    currentValue += ".";
  }
}
