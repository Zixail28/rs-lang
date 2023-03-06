import { array_of_results, answer_number } from './audiocall';
import { array, arrayOfRandomNumbers, generateWords, randomWrongAnswer, shuffleAnswers, Word } from './utils/utils';



export const renderLevel = async (group: number) => {
  await generateWords(group);
  randomWrongAnswer();
  array_of_results.push(array[answer_number]);
  const html = `
    <div class="right-word hide"></div>
    <div "onclick="document.getElementById('${array[answer_number].audio}-audio').play()" data-word="${array[answer_number].wordTranslate}" class="play-btn">
      <audio autoplay id="${array[answer_number].audio}-audio" src="http://localhost:8081/${array[answer_number].audio}"></audio>
    </div>
    <div class="answers-container">
      <button data-number="Digit1" data-word="${array[answer_number].wordTranslate}" value="${array[answer_number].wordTranslate}" id="${array[answer_number].id}" class="btn answers answer1">${array[answer_number].wordTranslate}</button>
      <button data-number="Digit2" data-word="${array[arrayOfRandomNumbers[0]].wordTranslate}" value="${array[arrayOfRandomNumbers[0]].wordTranslate}" id="${array[arrayOfRandomNumbers[0]].id}" class="btn answers answer2">${array[arrayOfRandomNumbers[0]].wordTranslate}</button>
      <button data-number="Digit3" data-word="${array[arrayOfRandomNumbers[1]].wordTranslate}" value="${array[arrayOfRandomNumbers[1]].wordTranslate} id="${array[arrayOfRandomNumbers[1]].id}" class="btn answers answer3">${array[arrayOfRandomNumbers[1]].wordTranslate}</button>
      <button data-number="Digit4" data-word="${array[arrayOfRandomNumbers[2]].wordTranslate}" value="${array[arrayOfRandomNumbers[2]].wordTranslate} id="${array[arrayOfRandomNumbers[2]].id}" class="btn answers answer4">${array[arrayOfRandomNumbers[2]].wordTranslate}</button>
    </div>
  `;
  (document.querySelector('.answers-wrapper') as HTMLElement).innerHTML = html;
  (document.querySelector('.play-btn') as HTMLElement).addEventListener('click', () => {
  });
  shuffleAnswers();
};

export function updateLevel() {
  randomWrongAnswer();
  array_of_results.push(array[answer_number]);
  const html = `
    <div class="right-word hide"></div>
    <div onclick="document.getElementById('${array[answer_number].audio}-audio').play()" data-word="${array[answer_number].wordTranslate}" class="play-btn">
      <audio autoplay id="${array[answer_number].audio}-audio" src="http://localhost:8081/${array[answer_number].audio}"></audio>
    </div>
    <div class="answers-container">
      <button data-number="Digit1" data-word="${array[answer_number].wordTranslate}" value="${array[answer_number].wordTranslate}" id="${array[answer_number].id}" class="btn answers answer1">${array[answer_number].wordTranslate}</button>
      <button data-number="Digit2" data-word="${array[arrayOfRandomNumbers[0]].wordTranslate}" value="${array[arrayOfRandomNumbers[0]].wordTranslate}" id="${array[arrayOfRandomNumbers[0]].id}" class="btn answers answer2">${array[arrayOfRandomNumbers[0]].wordTranslate}</button>
      <button data-number="Digit3" data-word="${array[arrayOfRandomNumbers[1]].wordTranslate}" value="${array[arrayOfRandomNumbers[1]].wordTranslate} id="${array[arrayOfRandomNumbers[1]].id}" class="btn answers answer3">${array[arrayOfRandomNumbers[1]].wordTranslate}</button>
      <button data-number="Digit4" data-word="${array[arrayOfRandomNumbers[2]].wordTranslate}" value="${array[arrayOfRandomNumbers[2]].wordTranslate}id="${array[arrayOfRandomNumbers[2]].id}" class="btn answers answer4">${array[arrayOfRandomNumbers[2]].wordTranslate}</button>
    </div>
  `;
  (document.querySelector('.answers-wrapper') as HTMLElement).innerHTML = html;
  renderResultsTable();
  shuffleAnswers();
}


export const renderRightWord = async() => {
  const html = `
    <div class="right-word__body">
      <div class="right-word__img">
        <img src="http://localhost:8081/${array[answer_number].image}" alt="${array[answer_number].wordTranslate}">
      </div>
      <div class="right-word__description">
        <p class="right-word__text">${array[answer_number].word} <span>${array[answer_number].transcription}</span> - ${array[answer_number].wordTranslate}</p>
        <p class="right-word__text">${array[answer_number].textExample}</p>
      </div>
    </div>
  `;
  (document.querySelector('.right-word') as HTMLElement).innerHTML = html;
}


export const renderResultsTable = () => `
  <tbody>
      ${array_of_results.map((word: Word) => `
        <tr>
          <td onclick="document.querySelector('#${word.word}-audio').play()" class="statistic-audio"><audio id="${word.word}-audio" src="http://localhost:8081/${word.audio}"></audio></td>
          <td>${word.word}</td>
          <td>${word.transcription}</td>
          <td>${word.wordTranslate}</td>
          <td class="${word.choice}-choice"></td>
        </tr>
      `)}
  </tbody>
`;


export const renderAuidoCallStatistic = () => {
  const html = `<table class="table">
          ${renderResultsTable()}
        </table>
  `;
  (document.querySelector('.audiocall-statistic__content') as HTMLElement).innerHTML = html;
}

export const audioElement = () => `
  <section class="audiocall">
    <div class="container">
      <div class="audiocall-wrapper">
        <div class="audiocall-description">
          <h1 class="audiocall-title-text">Аудиовызов</h1>
          <div class="audiocall-text">Добро пожаловать!<br>В этой игре вам нужно будет слушать произношение слова и выбирать его перевод из предложенных вариантов. Для начала игры выберите уровень сложности.</div>
          <div class="audiocall-levels">
          <select><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option></select>
          <button class="button game-start-button btn">Начать</button>
          </div>
        </div>
        <div class="audiocall-description-B hide">
          <h1 class="audiocall-title">Аудиовызов</h1>
          <div class="audiocall-text">Добро пожаловать!<br>В этой игре вам нужно будет слушать произношение слова и выбирать его перевод из предложенных вариантов.<br>Удачи!
          </div>
          <button class="audiocall-start">Начать</button>
        </div>   
      </div>
    </div>
    <div class="audiocall-game hide">
      <div class="container">
        <div class="answers-wrapper"></div>
        <div class="next-button">
          <button class="next btn">Next</buuton>
        </div>
      </div>
    </div>
    <div class="audiocall-statistic hide">
      <div class="container">
        <div class="audiocall-statistic__body">
          <div class="audiocall-statistic__content"></div>
          <div class="results-buttons">
            <button value="" class="repeat after-game"></button>
          </div>
        </div>
      </div>
    </div>
  </section>`;
