// utilizer -> yardimci

/**
 *
 * @param {*} maxIndex the maximum number which new random can be
 * @returns new random number from 0 to maxIndex parameter
 */
export const randomizer = (maxIndex) => Math.floor(Math.random() * maxIndex);
// implementation -> icraati

/**
 *
 * @param {*} numberCount - the count of numbers
 * @param {*} words - the array of the words
 * @returns numberCount words from the words array.
 */
export const randomWordsTaker = (numberCount, words) => {
  const maxRandomLimitIndex = words.length;
  const randomWords = [];

  for (let i = 0; i < numberCount; i++) {
    const randomIndex = randomizer(maxRandomLimitIndex); // 12
    const randomWord = words[randomIndex];
    randomWords.push(randomWord);
  }
  return randomWords;
};

/**
 *
 * @param {*} word - the word
 * @returns new span element
 */
export const wordAdderToWordBox = (word) => {
  const newElement = document.createElement("span");
  const spaninSozu = document.createTextNode(word);
  newElement.appendChild(spaninSozu);
  return newElement;
};

/**
 *
 * @param {*} newRandomWords - words array
 * @param {*} wordBox - wordBox itself
 */
export const writeElementToWordBox = (newRandomWords, wordBox) => {
  for (let i = 0; i < newRandomWords.length; i++) {
    const newElement = wordAdderToWordBox(newRandomWords[i]);
    wordBox.appendChild(newElement);
  }
};
/**
 *
 * @param {*} word1 - first string
 * @param {*} word2 - second string
 * @returns if they're same returns true, else returns false
 */
export const compareWords = (word1, word2) => word1.trim() === word2.trim();

/**
 * reloads the page
 */
export const reloadPage = () => {
  window.location.reload();
};
