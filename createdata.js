// createdata.js
const path = require("path");
const axios = require("axios");

const names = [
  "susan",
  "paul",
  "martha",
  "leon",
  "leon",
  "simon",
  "tanja",
  "bob",
  "bob",
  "bob",
  "carl",
  "chris",
  "robert"
];

const urls = ["http://localhost:8080/", "http://localhost:8080/hello/"];

function choose(arr) {
  const len = arr.length;
  const idx = Math.floor(Math.random() * len);
  return arr[idx];
}

function wait(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
}

async function main() {
  while (true) {
    const url = choose(urls);
    const name = choose(names);
    const callUrl = url + name;
    console.log(callUrl);

    try {
      await axios.get(callUrl);
    } catch (err) {
      console.log("Error:", err.toString());
    }

    const sec = 1 + Math.floor(Math.random() * 10);
    await wait(sec * 1000);
  }
}

main();
