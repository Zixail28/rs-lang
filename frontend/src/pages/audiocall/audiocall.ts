import { getUserStatistic, 
         updateUserStatistic,  
         createUserWord, 
         updateUserWord,
        loginUser } from '../../core/components/api/api';
import { audioElement, renderAuidoCallStatistic, renderLevel, updateLevel } from './audiocall-content';
import { array, showRightWord, Word, infoBook } from './utils/utils';
import { DayStatistic, userStatistic, dataUser } from '../../core/components/interfaces/interface';
import { waitRender } from '../../core/components/waitRender';

import './audiocall.scss';

export let answer_number = -1;
export let array_of_results: Word[] = [];
export let right_answers_counter = 0;
export let series_of_answers = 0;

export class AudioCall {
  async render() {
    if(localStorage.getItem('email')!=null) loginUser({'email': localStorage.getItem('email'), 'password': localStorage.getItem('password')})
    return audioElement();
  }

  async page_scripts() {
    let check: boolean = false;
    let maxSeries = 0;

    if (infoBook.isFromBook) {
      (document.querySelector('.audiocall-description') as HTMLElement).classList.add('hide');
      (document.querySelector('.audiocall-description-B') as HTMLElement).classList.remove('hide');
    }
    if (localStorage.getItem('userId') !== '' &&  localStorage.getItem('userId') !==null) {
      const statisticStorage: DayStatistic= await getUserStatistic(localStorage.getItem('userId'));  
      userStatistic.learnedWords = statisticStorage.learnedWords;
      userStatistic.wordsPerDay = statisticStorage.optional.wordsPerDay;
      userStatistic.audiocallwordsPerDay = statisticStorage.optional.audiocallwordsPerDay;
      userStatistic.audiocallPercent = String(statisticStorage.optional.audiocallPercent).substr(0, 4);
      userStatistic.audiocallRounds = statisticStorage.optional.audiocallRounds;
      userStatistic.allRounds = statisticStorage.optional.allRounds;
      userStatistic.totalPercent = String(statisticStorage.optional.totalPercent).substr(0, 4);
      userStatistic.audiocallSeries = statisticStorage.optional.audiocallSeries;
      userStatistic.wordInSprint = statisticStorage.optional.wordInSprint;
      userStatistic.wordInGames = statisticStorage.optional.wordInGames;
      userStatistic.sprintwordsPerDay = statisticStorage.optional.sprintwordsPerDay;
      userStatistic.sprintPercent = statisticStorage.optional.sprintPercent;
      userStatistic.sprintRounds = statisticStorage.optional.sprintRounds;
    }
    
    const answersBody = document.querySelector('.answers-wrapper') as HTMLElement;
    const repeatButton = (document.querySelector('.repeat') as HTMLButtonElement);
    const nextButton = (document.querySelector('.next') as HTMLButtonElement);
    const audioCall = document.querySelector('.audiocall') as HTMLElement;
    const audiocallContainer = document.querySelector('.audiocall .container') as HTMLElement;
    const audiocallRound = document.querySelector('.audiocall-game') as HTMLElement;
    const audiocallStat = document.querySelector('.audiocall-statistic') as HTMLElement;
    const answers = document.querySelectorAll('.answers');

    function showLevels() {
      check = true;
      if (infoBook.isFromBook) {
        (document.querySelector('.audiocall-start') as HTMLButtonElement).addEventListener('click', async () => {
          array_of_results = [];
          (document.querySelector('.audiocall .container') as HTMLElement).classList.add('hide');
          answer_number = 0;
          while (answersBody.firstChild) {
            answersBody.removeChild(answersBody.firstChild);
          }


					const preloader = document.createElement('div');
					(document.querySelector('.audiocall') as HTMLElement).append(preloader);
					preloader.innerHTML = waitRender();


          await renderLevel(infoBook.group);
          (document.querySelector('.audiocall-game') as HTMLElement).classList.remove('hide');
        });
      }
          else {
            audioCall.addEventListener('click', async (event) => {
          const target = document.querySelector('select');
          if ((event.target as HTMLButtonElement).classList.contains('game-start-button')) {
            array_of_results = [];
            audiocallContainer.classList.add('hide');
            answer_number = 0;
            while (answersBody.firstChild) {
              answersBody.removeChild(answersBody.firstChild);
            }
            repeatButton.value = target.value;

						
						const preloader = document.createElement('div');
						(document.querySelector('.audiocall') as HTMLElement).append(preloader);
						preloader.innerHTML = waitRender();


            await renderLevel(+target.value);
            audiocallRound.classList.remove('hide');
          }
        }); }
    }
    showLevels();

    if (audiocallRound.classList.contains('hide')) {
      answer_number = 0;
      right_answers_counter = 0;
      series_of_answers = 0;
    };
    
      answersBody.addEventListener('click', async (event) => {
        const target = event.target as HTMLButtonElement;
        if (target.classList.contains('answers')) {
          const auidoButton = document.querySelector('.play-btn') as HTMLElement;
          const rightAnswer = auidoButton.getAttribute('data-word');
          const selected = target.value;
          const currentWord = { "difficulty": "hard" };
         
          if ((localStorage.getItem('userId') !== '' && localStorage.getItem('userId') !== null)) {userStatistic.wordInAudiocall[array[answer_number].id] = {
            audiocall: {
              guessed: 0,
              unguessed: 0,
              guessedInARow: 0,
            }
          }}
          
          if (selected !== rightAnswer) {
            if ((localStorage.getItem('userId') !== '' && localStorage.getItem('userId') !== null)) {userStatistic.wordInAudiocall[array[answer_number].id].audiocall.guessedInARow = 0;
            userStatistic.wordInAudiocall[array[answer_number].id].audiocall.unguessed = userStatistic.wordInAudiocall[array[answer_number].id].audiocall.unguessed + 1;}
            series_of_answers = 0;
            target.style.background = 'red';
            array[answer_number].choice = 'wrong';
            showRightWord();
            await createUserWord(localStorage.getItem('userId'), (array[answer_number]).id, currentWord);
          } 
          else {
            if (localStorage.getItem('userId') !== '' && localStorage.getItem('userId') !== null) {userStatistic.wordInAudiocall[array[answer_number].id].audiocall.guessedInARow++;
            userStatistic.wordInAudiocall[array[answer_number].id].audiocall.guessed = userStatistic.wordInAudiocall[array[answer_number].id].audiocall.guessed + 1;}
            right_answers_counter++;
            series_of_answers++;
            if(series_of_answers>maxSeries) maxSeries=series_of_answers;
            target.style.background = 'green';
            array[answer_number].choice = 'right';
            showRightWord();
            if ((localStorage.getItem('userId') !== '' && localStorage.getItem('userId') !== null) && userStatistic.wordInAudiocall[array[answer_number].id].audiocall.guessedInARow > 2) {
              await updateUserWord(localStorage.getItem('userId'), array[answer_number].id, { "difficulty": "learned" });
            }
          }
        }
      });
    
    repeatButton.addEventListener('click', async () => {
      array_of_results = [];
      (document.querySelector('.audiocall-statistic') as HTMLElement).classList.add('hide');
      audiocallRound.classList.remove('hide');
      answer_number = 0;
      right_answers_counter = 0;
      updateLevel();
    });

    async function nextQuestion() {
      
      if (answer_number === 19) {
        await renderAuidoCallStatistic();
        array_of_results.map(async (element: Word) => {
          if ((localStorage.getItem('userId') !== '' && localStorage.getItem('userId') !== null) && userStatistic.wordsInQuiestions.includes(element.word) || dataUser.userId === '') return;
          else {
            if (localStorage.getItem('userId') !== '' && localStorage.getItem('userId') !== null) {userStatistic.audiocallwordsPerDay = userStatistic.audiocallwordsPerDay + 1;
            userStatistic.wordsPerDay = userStatistic.wordsPerDay + 1;
            userStatistic.wordsInQuiestions.push(element.word);
            if (maxSeries > userStatistic.audiocallSeries) {
              userStatistic.audiocallSeries = maxSeries;
            }} 
          }
        })
        if(check){if (localStorage.getItem('userId') !== '' && localStorage.getItem('userId') !== null) {
          userStatistic.audiocallRounds = userStatistic.audiocallRounds + 1;
          userStatistic.allRounds = userStatistic.allRounds + 1;
          userStatistic.audiocallPercent = (Number(userStatistic.audiocallPercent) + Number(((right_answers_counter / 20) * 100))) / userStatistic.audiocallRounds;
          userStatistic.totalPercent = (Number(userStatistic.totalPercent) + Number(((right_answers_counter / 20) * 100))) / userStatistic.allRounds;
          userStatistic.audiocallSeries = maxSeries;
          const wordPerDay = {
            learnedWords: 0,
            optional: {
              wordsPerDay: userStatistic.wordsPerDay,
              audiocallwordsPerDay: userStatistic.audiocallwordsPerDay,
              audiocallRounds: userStatistic.audiocallRounds,
              audiocallPercent: userStatistic.audiocallPercent,
              sprintwordsPerDay: userStatistic.sprintwordsPerDay,
              sprintRounds: userStatistic.sprintRounds,
              sprintPercent: userStatistic.sprintPercent,
              allRounds: userStatistic.allRounds,
              totalPercent: userStatistic.totalPercent,
              audiocallSeries: userStatistic.audiocallSeries,
              sprintSeries: userStatistic.sprintSeries,
              wordInGames: userStatistic.wordInGames,
              wordInAudiocall: userStatistic.wordInAudiocall,
              wordInSprint: userStatistic.wordInSprint,
            }
          }
          await updateUserStatistic(localStorage.getItem('userId'), wordPerDay);
        }
        check=false;
      }
        
        while (answersBody.firstChild) {
          answersBody.removeChild(answersBody.firstChild);
        }
        audiocallRound.classList.add('hide');
        audiocallStat.classList.remove('hide');
      } 
      else {
        answer_number++;
        array[answer_number].choice = 'wrong';
        updateLevel();
      }
    }
 
    nextButton.addEventListener('click', nextQuestion);
    
      document.addEventListener('keydown', (event) => {
        answers.forEach(async (element) => {
          if (element.getAttribute('data-number') === event.code) {
            const auidoButton = document.querySelector('.play-btn') as HTMLElement;
            const button = ((document.querySelector('.answers-container') as HTMLElement)?.children[Number(`${event.code.split('')[5]}`) - 1]);
            const rightAnswer = auidoButton.getAttribute('data-word');
            const selected = button.getAttribute('data-word');
            if (selected !== rightAnswer) {
              series_of_answers = 0;
              button.classList.add('wrong-answer');
              array[answer_number].choice = 'wrong';
              showRightWord();
            } else {
              right_answers_counter++;
              button.classList.add('right-answer');
              array[answer_number].choice = 'right';
              showRightWord();
            }
          } 
        });
      });

   document.addEventListener('keydown', event =>{
    const auidoButton = document.querySelector('.play-btn') as HTMLElement;
    const rightAnswer = auidoButton.getAttribute('data-word');
    const buttons = document.querySelectorAll('.answers')
    if(event.code == 'Digit1') {
      if(buttons[0].innerHTML==rightAnswer) {
        right_answers_counter++;
        buttons[0].classList.add('right-answer');
        array[answer_number].choice = 'right';
        series_of_answers++;
        if(series_of_answers>maxSeries) maxSeries=series_of_answers;
        showRightWord();
      }
      else {
        series_of_answers = 0;
        buttons[0].classList.add('wrong-answer');
        array[answer_number].choice = 'wrong';
        showRightWord();
      }
    }
    if(event.code == 'Digit2') {
      if(buttons[1].innerHTML==rightAnswer) {
        right_answers_counter++;
        buttons[1].classList.add('right-answer');
        array[answer_number].choice = 'right';
        series_of_answers++;
        if(series_of_answers>maxSeries) maxSeries=series_of_answers;
        showRightWord();
      }
      else {
        series_of_answers = 0;
        buttons[1].classList.add('wrong-answer');
        array[answer_number].choice = 'wrong';
        showRightWord();
      }
    }
    if(event.code == 'Digit3') {
      if(buttons[2].innerHTML==rightAnswer) {
        right_answers_counter++;
        buttons[2].classList.add('right-answer');
        array[answer_number].choice = 'right';
        series_of_answers++;
        if(series_of_answers>maxSeries) maxSeries=series_of_answers;
        showRightWord();
      }
      else {
        series_of_answers = 0;
        buttons[2].classList.add('wrong-answer');
        array[answer_number].choice = 'wrong';
        showRightWord();
      }
    }
    if(event.code == 'Digit4') {
      if(buttons[3].innerHTML==rightAnswer) {
        right_answers_counter++;
        buttons[3].classList.add('right-answer');
        array[answer_number].choice = 'right';
        series_of_answers++;
        if(series_of_answers>maxSeries) maxSeries=series_of_answers;
        showRightWord();
      }
      else {
        series_of_answers = 0;
        buttons[3].classList.add('wrong-answer');
        array[answer_number].choice = 'wrong';
        showRightWord();
      }
    }
   })
  }
}

