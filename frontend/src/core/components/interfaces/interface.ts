export interface IRoute {
  name: string;
  component: () => void;
}
export type User = {
	name: string,
	userId: string,
	token: string,
	refreshToken: string,
	errCode: string,
	message: string
}
		
export const dataUser: User = {
	name: '',
	userId: '',
	token: '',
	refreshToken: '',
	errCode: '',
	message: ''
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

export interface storeSprintInterface {
	answers: { word: wordInterface; answer: boolean }[];
	correctAnswers: number;
	points: number;
	timer: NodeJS.Timer | null;
	allAnswersSprint: { [id: string]: number };
	audioSprint: boolean;
	statisticWord: { [id: string]: statisticWord };
	numberOfGamesSprint: number;
	numberTrueAnswer: number;
	idTrueWordsAnswer: { [id: string]: number };
	idFalseWordsAnswer: { [id: string]: number };
	seriasTrueAnswer: number;
	allAnswersInRaund: number
  }

export interface wordInterface {
	audio: string;
	audioExample: string;
	audioMeaning: string;
	group: number;
	id: string;
	image: string;
	page: number;
	textExample: string;
	textExampleTranslate: string;
	textMeaning: string;
	textMeaningTranslate: string;
	transcription: string;
	word: string;
	wordTranslate: string;
}

interface statisticWord {
	trueUnswer: number;
	falseUnswer: number;
}

export interface userWordSprint {
	id: string;
	difficulty: string;
	wordId: string;
}

export const storeSprint: storeSprintInterface = {
    answers: [],//ответы в текущей игре
    correctAnswers: 0,// подсчет правильных ответов подряд
    points: 0,
    timer: null,
    allAnswersSprint: {},// подсчет правильных ответов по id для добавления в изученные,
    audioSprint: true,//Включение или отключение звука
    statisticWord: {},
    numberOfGamesSprint: 0,// Всего сыграно раз
    numberTrueAnswer: 0,//Колличество правильных ответов для статистики
    idTrueWordsAnswer: {},
    idFalseWordsAnswer: {},
    seriasTrueAnswer: 0,
    allAnswersInRaund: 0//Всего ответов в раунде
}

export interface wordValuesInterface {
	img: string;
	nameEng: string;
	nameRus: string;
	answer: boolean;
	word: wordInterface;
  }
  
  export type Word = {
	id: string;
	_id?: string;
	group: number;
	page: number;
	word: string;
	image: string;
	audio: string;
	audioMeaning: string;
	audioExample: string;
	textMeaning: string;
	textExample: string;
	transcription: string;
	wordTranslate: string;
	textMeaningTranslate: string;
	textExampleTranslate: string;
	userWord?: UserWord;
  };

  export type UserWord = {
	difficulty: DifficultyType;
	optional?: {
	  statistics?: {
		correct: number;
		incorrect: number;
	  };
	};
  };

  export type DifficultyType = 'hard' | 'normal' | 'easy';