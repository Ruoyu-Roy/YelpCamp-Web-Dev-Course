function printReverse(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i]);
  }
}

function isUniform(arr) {
  uni = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== uni) {
      return false;
    }
  }
  return true;
}

function sumArray(arr) {
  sum = 0;
  arr.forEach(function (num) {
    sum += num;
  });
  return sum;
}

function max(arr) {
  max = Number.MIN_VALUE;
  arr.forEach(function (num) {
    if (num > max) {
      max = num;
    }
  });
  return max;
}

function foreach(arr, func) {
  for (let i = 0; i < arr.length; i++) {
    func(arr[i]);
  }
}

Array.prototype.myforEach = function (func) {
  for (let i = 0; i < this.length; i++) {
    func(this[i]);
  }
};
