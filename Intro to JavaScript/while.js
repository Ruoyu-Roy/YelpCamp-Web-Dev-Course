console.log("Print all numbers btw -10 and 19");

let i = -10;
while (i < 20) {
  console.log(i);
  i += 1;
}

console.log("Print all even numbers btw 10 and 40");

i = 10;
while (i < 41) {
  console.log(i);
  i += 2;
}

console.log("Print all odd numbers btw 300 and 333");

i = 300;
while (i < 334) {
  if (i % 2 === 1) {
    console.log(i);
  }
  i += 1;
}

console.log("Print all numbers divisible by 5 and 3 btw 5 and 50");

i = 5;
while (i < 51) {
  if (i % 5 === 0 && i % 3 === 0) {
    console.log(i);
  }
  i += 1;
}
