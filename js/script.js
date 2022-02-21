import { words}  from './words.js'  /* words arrayini daxil et */
import {randomWordsTaker, writeElementToWordBox} from './utils.js'

const  wordBox=document.querySelector("#wordBox")
const  enteredWord=document.querySelector("#enteredWord")
const  time=document.querySelector("#time")
const  resetBtn=document.querySelector("#resetBtn")


/*
+1. sozlerden 15 eded random formada secin. 
+2. secilen sozleri wordBox-un icerisine yazin
*/



const  newRandomWords = randomWordsTaker(15, words)

writeElementToWordBox(newRandomWords, wordBox)
