import { words } from "./words_DB.js"; /* words arrayini daxil et */
import { writeElementToWordBox, compareWords, reloadPage, randomWordsTaker } from "./utils.js";

const wordBox = document.querySelector("#wordBox");
const enteredWord = document.querySelector("#enteredWord");
const time = document.querySelector("#time");
const resetBtn = document.querySelector("#resetBtn");
const modal = document.querySelector("#modal");
wordBox.style.top = "-1px";

const newRandomWords = randomWordsTaker(words.length, words);
console.log(newRandomWords);
console.log(words);
writeElementToWordBox(newRandomWords, wordBox);

let currentWordIndex = 0;
let wordsCountPerMinute = 0;
let seconds = 60;

const timer = () => {
  if (seconds === 0) {
    enteredWord.disabled = true;
    clearInterval(intervalTimer);
    // show results in modal
    modal.parentElement.style.display = "flex";
    modal.innerHTML = `Your result: ${wordsCountPerMinute} word per minute`;
    // -----------------------------------------------------------------
  } else {
    seconds = seconds - 1;
    time.innerHTML = seconds + "s";
  }
};

let intervalTimer = undefined;

let currentRowOffsetTop = 20;

enteredWord.addEventListener("keydown", ({ keyCode }) => {
  if (enteredWord.dataset.didstart === "0") {
    enteredWord.dataset.didstart = "1";
    intervalTimer = setInterval(timer, 1000);
  }
  if (keyCode === 32 && wordBox.childNodes[currentWordIndex + 2].offsetTop > currentRowOffsetTop) {
    console.dir(wordBox);
    let currentTop = parseInt(wordBox.style.top);
    console.log(currentTop);
    wordBox.style.top = `${currentTop - 40}px`;
    currentRowOffsetTop = wordBox.childNodes[currentWordIndex + 2].offsetTop;
    // string interpolation
  }
});

wordBox.childNodes[currentWordIndex + 1].className = "activeSpan";

enteredWord.addEventListener("keydown", ({ keyCode }) => {
  let arrayLength = newRandomWords.length;
  if (keyCode === 32 && currentWordIndex < arrayLength) {
    wordBox.childNodes[currentWordIndex + 2].className = "activeSpan";

    if (compareWords(enteredWord.value, newRandomWords[currentWordIndex])) {
      wordsCountPerMinute++;
      wordBox.childNodes[currentWordIndex + 1].className = "correctWord";
    } else {
      wordBox.childNodes[currentWordIndex + 1].className = "wrongWord";
    }

    enteredWord.value = "";
    currentWordIndex++;
  }
});

resetBtn.addEventListener("click", reloadPage);

/*
+1. xal logic-i ferqlidi: deqiqede yazilan sozlerin sayina uygun. 
2. sozler bitenden sonra yenilenmelidi, ya da 15 dene yox, daha cox soz olsun. 

*/
