import { dataUser  } from "../../core/components/interfaces/interface";
 
export const userStatistic: any =  {
	wordsPerDay: 0,
	audiocallwordsPerDay: 0,
	sprintwordsPerDay: 0,
	wordsInQuiestions: [],
	totalPercent: 0,
	audiocallPercent: 0,
	sprintPercent: 0,
	allRounds: 0,
	audiocallRounds: 0,
	sprintRounds: 0,
	audiocallSeries: 0,
	sprintSeries: 0,
	wordInGames: {},
	wordInAudiocall: {},
	wordInSprint: {},
	learnedWordsFromBook: 0
}

export type DayStatistic = {
	learnedWords: number,
	optional: {
	  wordsPerDay: number,
	  audiocallwordsPerDay: number,
	  audiocallRounds: number,
	  audiocallPercent: number,
	  audiocallSeries: number,
	  sprintwordsPerDay: number,
	  sprintRounds: number,
	  sprintPercent: number,
	  sprintSeries: number,
	  allRounds: number,
	  totalPercent: number,
	  wordInGames: {},
	  wordInAudiocall: {},
	  wordInSprint: {},
  }
}

export type LearnedWords = {
  difficulty: string,
}

export async function getWords(page: number, group: number) {
  const response = await fetch(`http://localhost:8081/words?page=${page}&group=${group}`);
  const words = await response.json();
  return words;
}


export const getUserStatistic = async(id = dataUser.userId) => {
  const rawResponse = await fetch(`http://localhost:8081/users/${id}/statistics`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${dataUser.token}`,
      'Accept': 'application/json',
      
    }
  });
  if(rawResponse.status == 404) {
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
	  await updateUserStatistic(dataUser.userId, wordPerDay);
	  location.reload;
}
  const settings = await rawResponse.json();
  return settings;
}

export const updateUserStatistic = async(id = dataUser.userId, body: DayStatistic) => {
  const rawResponse = await fetch(`http://localhost:8081/users/${id}/statistics`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${dataUser.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const setting = await rawResponse.json();
  return setting;
}



function setLocalStorageStatistc() {
  localStorage.setItem('words', userStatistic.wordsInQuiestions);
}
window.addEventListener('beforeunload', setLocalStorageStatistc);

function getLocalStorageStatistic() {
  userStatistic.wordsInQuiestions = localStorage.getItem('words')?.split(',');
}
window.addEventListener('load', getLocalStorageStatistic);









