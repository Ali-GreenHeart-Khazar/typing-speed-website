import { words } from "./words_DB.js"; /* words arrayini daxil et */
import { randomWordsTaker, writeElementToWordBox, compareWords } from "./utils.js";

const wordBox = document.querySelector("#wordBox");
const enteredWord = document.querySelector("#enteredWord");
const time = document.querySelector("#time");
const resetBtn = document.querySelector("#resetBtn");
const xalTablosu = document.querySelector("#xal");
/*
+1. sozlerden 15 eded random formada secin. 
+2. secilen sozleri wordBox-un icerisine yazin
*/

const newRandomWords = randomWordsTaker(15, words);

writeElementToWordBox(newRandomWords, wordBox);

let currentWordIndex = 0;
let xal = 0;
wordBox.childNodes[currentWordIndex + 1].className = "activeSpan";

const finishTheGame = () => {
  enteredWord.disabled = true;
  clearInterval(intervalTimer);
};

let seconds = 60;

const timer = () => {
  if (seconds === 0) {
    finishTheGame();
  } else {
    seconds = seconds - 1;
    time.innerHTML = seconds + "s";
  }
};

const intervalTimer = setInterval(timer, 1000);

const classNameRemover = (index, isItOld) => {
  for (let i = 0; i < index; i++) {
    wordBox.childNodes[i].className = isItOld ? "oldWords" : "";
  }
};

enteredWord.addEventListener("keydown", ({ keyCode }) => {
  let arrayLength = newRandomWords.length;
  if (currentWordIndex === arrayLength) {
    alert("oyun bitdi");
    //   neticelerGoster -> showResult
  }
  if (keyCode === 32 && currentWordIndex < arrayLength) {
    wordBox.childNodes[currentWordIndex + 2].className = "activeSpan";
    classNameRemover(currentWordIndex + 2, true);
    if (compareWords(enteredWord.value, newRandomWords[currentWordIndex])) xal += 10;
    else xal -= 10;

    xalTablosu.innerHTML = xal;
    enteredWord.value = "";
    currentWordIndex++;
  }
});

resetBtn.addEventListener("click", () => {
  window.location.reload();
});

/*
+1. give style to current word!
+a. wordBox-un childNodes-larini gotur
+b. add activeSpan class to className of the object. 
+c. add oldWords class to className of the span

+2. time is not working!
+3. reset is not working
*/
