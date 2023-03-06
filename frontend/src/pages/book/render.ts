import {getWords} from '../../core/components/api/api';
import {getWord} from '../../core/components/api/api';
import {getUserWords} from '../../core/components/api/api';
import { infoBook } from '../audiocall/utils/utils';
import { dataUser } from '../../core/components/interfaces/interface';

export type WordType = {
  wordId: string,
  difficulty: string
};

export async function createItem(id:string) {
  const data = await getWord(id);
  const wordContainer = <HTMLElement>document.querySelector('#main_word-review');
  wordContainer.innerHTML += `<div class="main_word-item" id="${data.id}">
      <div class="main_word-item-text">
        <span class="word"><b>${data.word}</b></span><br>
        <span class="wordTranslate">${data.wordTranslate}</span>
        <div class="transcription">${data.transcription}</div>
        <audio controls src="http://localhost:8081/${data.audio}"></audio>
        <div class="textMeaning">
          <h3>Значение</h3>
          <div class="title-textMeaning">${data.textMeaning}</div>
          <div class="title-textMeaningTranslate">${data.textMeaningTranslate}</div>
          <audio controls src="http://localhost:8081/${data.audioMeaning}"></audio>
        </div>
        <div class="textExample">
          <h3>Пример</h3>
          <div class="title-textExample">${data.textExample}</div>
          <div class="title-textExampleTranslate">${data.textExampleTranslate}</div>
          <audio controls src="http://localhost:8081/${data.audioExample}"></audio>
        </div>
     </div>
     <div class="main_word-item-img">
       <img src="http://localhost:8081/${data.image}" alt=""/>
     </div>
     </div>
    `;
    infoBook.group = data.group;
    infoBook.page = data.page;
}

export async function createItemHardWord(wordId:string) {
  const data = await getWord(wordId);
  const wordContainer = <HTMLElement>document.querySelector('#main_word-review');
  wordContainer.innerHTML += `<div class="main_word-item" id="${data.id}">
      <div class="main_word-item-text">
        <span class="word"><b>${data.word}</b></span><br>
        <span class="wordTranslate">${data.wordTranslate}</span>
        <div class="transcription">${data.transcription}</div>
        <audio controls src="http://localhost:8081/${data.audio}"></audio>
        <div class="textMeaning">
          <h3>Значение</h3>
          <div class="title-textMeaning">${data.textMeaning}</div>
          <div class="title-textMeaningTranslate">${data.textMeaningTranslate}</div>
          <audio controls src="http://localhost:8081/${data.audioMeaning}"></audio>
        </div>
        <div class="textExample">
          <h3>Пример</h3>
          <div class="title-textExample">${data.textExample}</div>
          <div class="title-textExampleTranslate">${data.textExampleTranslate}</div>
          <audio controls src="http://localhost:8081/${data.audioExample}"></audio>
        </div>
     </div>
     <div class="main_word-item-img">
       <img src="http://localhost:8081/${data.image}" alt=""/>
     </div>
     </div>
    `;
    infoBook.group = data.group;
    infoBook.page = data.page;
}

export async function createBook() {
  let arrWords;

  const containerWords = <HTMLElement>document.querySelector('#main_word-container');
  if (infoBook.group === 6 && dataUser.userId != '') {
    arrWords = await getArrHardWords();
  } else {
    arrWords = await getWords(infoBook.page, infoBook.group);
  }

  containerWords.innerHTML = '';
  for (let i = 0; i < arrWords.length; i++) {
    containerWords.innerHTML += `
    <div class="main_word-items" id="${arrWords[i].id}">
      <span class="title"><b>${arrWords[i].word}</b></span>
      <span class="title">${arrWords[i].wordTranslate}</span>
      <div id="extra-${arrWords[i].id}">
        <button class="btn btn-learned_word" data-learned=${arrWords[i].id}>Выучил</button>
        <button class="btn btn-hard_word" data-hard=${arrWords[i].id}>Сложно</button>
      </div>
      <div id="extraUser-${arrWords[i].id}">
        <button class="btn btn-hard-restore" data-restore=${arrWords[i].id}>Восстановить</button>
        <!--<button class="btn btn-statistics_word" data-statistics=${arrWords[i].id}>Статистика</button>-->
      </div>
    </div>
    `;
    const btnsExtra = <HTMLDivElement>document.getElementById(`extra-${arrWords[i].id}`);
    const btnsExtraUser = <HTMLDivElement>document.getElementById(`extraUser-${arrWords[i].id}`);
    if (dataUser.token !== '' && infoBook.group < 6) {
      btnsExtra.style.display = '';
      btnsExtraUser.style.display = 'none';
      checkHardLearnedWord(arrWords[i].id);
    }
    if (dataUser.token !== '' && infoBook.group == 6) {
      btnsExtra.style.display = 'none';
      btnsExtraUser.style.display = '';
    }
  }
}

async function checkHardLearnedWord(idCurrentWord: string) {
  const arrHardAndLearnedWords = await getUserWords(dataUser.userId);
  arrHardAndLearnedWords.forEach((oneWord: WordType) => {
      if (oneWord.wordId == idCurrentWord && oneWord.difficulty == 'hard') {
          const btnHard = <HTMLElement>document.querySelector(`button[data-hard='${idCurrentWord}']`);
          btnHard.classList.add('hard_word-select');
          btnHard.setAttribute('disabled', 'true');
      }
      if (oneWord.wordId == idCurrentWord && oneWord.difficulty == 'learned') {
        const btnLearned = <HTMLElement>document.querySelector(`button[data-learned='${idCurrentWord}']`);
        const btnHard = <HTMLElement>document.querySelector(`button[data-hard='${idCurrentWord}']`);
        btnLearned.classList.add('learned_word-select');
        btnHard.setAttribute('disabled', 'true');
        btnLearned.setAttribute('disabled', 'true');
      }
    });
}

export async function getArrHardWords() {
  const arrHardWords: object[] = [];
  await getUserWords(dataUser.userId).then(async (arrHardAndLearnedWords) => {
    for (let oneWord of arrHardAndLearnedWords) {
       if (oneWord.difficulty == 'hard') {
        await getWord(oneWord.wordId).then( (elem) => {
          arrHardWords.push(elem);
        });
      }
    }
  });
  return arrHardWords;
}
