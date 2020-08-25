function isEven(num) {
  return num % 2 === 0;
}

function factorial(num) {
  let fac = 1;
  for (let i = 1; i <= num; i++) {
    fac *= i;
  }

  return fac;
}

function kebabToSnake(string) {
  let output = "";
  for (let i = 0; i < string.length; i++) {
    if (string[i] === "-") {
      output += "_";
    } else {
      output += string[i];
    }
  }

  return output;
}
