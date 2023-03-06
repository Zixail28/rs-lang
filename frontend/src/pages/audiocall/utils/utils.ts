import { getWords} from '../../../core/components/api/api';
import { answer_number } from '../audiocall';
import { renderRightWord } from '../audiocall-content';

const COUNT_OF_WORDS = 20;
export let arrayOfRandomNumbers: number[] = [];


export function shuffleAnswers() {
  let div = new Array(4);
  for (let buttons = 0; buttons < 4; buttons++) {
    div[buttons] = document.querySelector(`.answer${buttons + 1}`);
    (document.querySelector('.answers-container') as HTMLElement).removeChild(div[buttons]);
  }
  while (div.length > 0) {
    (document.querySelector('.answers-container') as HTMLElement).appendChild(div.splice(Math.floor(Math.random() * div.length),1)[0]);
  }
}

export function randomWrongAnswer() {
  arrayOfRandomNumbers = [];
  const countOfCycles = 3;
  let arrayOfTwentyNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  arrayOfTwentyNumbers.splice(arrayOfTwentyNumbers.indexOf(answer_number), 1);
  for(let cycles = 1; cycles <= countOfCycles; cycles++){
    arrayOfRandomNumbers.push(arrayOfTwentyNumbers.splice(Math.random()*arrayOfTwentyNumbers.length,1)[0]);
  }
  return arrayOfRandomNumbers;
}

export function randomInteger(min: number, max: number) {
  const number = min + Math.random() * (max + 1 - min);
  return Math.floor(number);
}

export let array: Word[] = [];
export type Word = {
  truth: boolean;
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audioExample: string,
  audioMeaning: string,
  audio: string,
  wordTranslate: string,
  transcription: string,
  choice: string,
  textMeaning: string,
  textExample: string,
};

export const infoBook = {
  group: 0,
  page: 0,
  isFromBook: false
}


export async function generateWords(group: number) {
  if (infoBook.isFromBook) {
    array = await getWords(infoBook.page, infoBook.group);
  }
    else{for (let numberOfWord = 1; numberOfWord <= COUNT_OF_WORDS; numberOfWord++) {
      const numberOfActualWord = randomInteger(0,19);
      const words = await getWords(randomInteger(0,29), group);
      let newWord: Word;

      newWord = (words.slice(numberOfActualWord, numberOfActualWord+ 1)).flat();
      array.push(words[numberOfActualWord]);
    }}
  return array;
}
document.body.addEventListener('click', (event) => {
  const target = event.target as HTMLButtonElement;
  if (target.classList.contains('levels')) {
    array = [];
  }
});

export async function showRightWord() {
  (document.querySelector('.right-word') as HTMLElement).classList.remove('hide');
  (document.querySelector('.play-btn') as HTMLElement).classList.add('hide');
  renderRightWord();
}








