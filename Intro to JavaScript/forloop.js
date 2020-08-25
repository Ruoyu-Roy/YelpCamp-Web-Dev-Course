console.log("Print all numbers btw -10 and 19");

for (let i = -10; i < 20; i++) {
  console.log(i);
}

console.log("Print all even numbers btw 10 and 40");

for (let i = 10; i < 41; i += 2) {
  console.log(i);
}

console.log("Print all odd numbers btw 300 and 333");

for (let i = 300; i < 334; i++) {
  if (i % 2 === 1) {
    console.log(i);
  }
}

console.log("Print all numbers divisible by 5 and 3 btw 5 and 50");

for (let i = 5; i < 51; i++) {
  if (i % 5 === 0 && i % 3 === 0) {
    console.log(i);
  }
}
