import { words } from "./words_DB.js"; /* words arrayini daxil et */
import { randomWordsTaker, writeElementToWordBox, compareWords, reloadPage } from "./utils.js";

const wordBox = document.querySelector("#wordBox");
const enteredWord = document.querySelector("#enteredWord");
const time = document.querySelector("#time");
const resetBtn = document.querySelector("#resetBtn");
const xalTablosu = document.querySelector("#xal");
const modal = document.querySelector("#modal");

const newRandomWords = randomWordsTaker(15, words);

writeElementToWordBox(newRandomWords, wordBox);

let currentWordIndex = 0;
let xal = 0;
let seconds = 60;

const timer = () => {
  if (seconds === 0) {
    enteredWord.disabled = true;
    clearInterval(intervalTimer);
    // show results in modal
    modal.parentElement.style.display = "flex";
    modal.innerHTML = `Your Score is ${xal}`;
    // -----------------------------------------------------------------
  } else {
    seconds = seconds - 1;
    time.innerHTML = seconds + "s";
  }
};

let intervalTimer = undefined;

enteredWord.addEventListener("keydown", () => {
  if (enteredWord.dataset.didstart === "0") {
    enteredWord.dataset.didstart = "1";
    intervalTimer = setInterval(timer, 1000);
  }
});

wordBox.childNodes[currentWordIndex + 1].className = "activeSpan";

enteredWord.addEventListener("keydown", ({ keyCode }) => {
  let arrayLength = newRandomWords.length;
  if (currentWordIndex === arrayLength) {
    // 60 saniye kecmeden uddunuz!
    modal.parentElement.style.display = "flex";
    modal.innerHTML = "Congratulations! You Wont the Game!!!";
  }
  if (keyCode === 32 && currentWordIndex < arrayLength) {
    wordBox.childNodes[currentWordIndex + 2].className = "activeSpan";

    if (compareWords(enteredWord.value, newRandomWords[currentWordIndex])) {
      xal += 10;
      wordBox.childNodes[currentWordIndex + 1].className = "correctWord";
    } else {
      xal -= 10;
      wordBox.childNodes[currentWordIndex + 1].className = "wrongWord";
    }

    xalTablosu.innerHTML = xal;
    enteredWord.value = "";
    currentWordIndex++;
  }
});

resetBtn.addEventListener("click", reloadPage);
