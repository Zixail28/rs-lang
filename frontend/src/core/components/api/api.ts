import { dataUser, DayStatistic, userStatistic  } from "../interfaces/interface";
	// регистрация нового пользователя
	export const createUser = async (user: object) => {
		try {
			const rawResponse = await fetch('http://localhost:8081/users', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user)
			});

			if (!rawResponse.ok) {
				throw new Error(`${rawResponse.status}`);
			}
				const content = await rawResponse.json();
			}
			catch (err) {
				if (err instanceof Error) dataUser.errCode = err.message;
			}
	};

	// вход уже зарегистрированного пользователя
	export const loginUser = async (user: object) => {
			try {
					const rawResponse = await fetch('http://localhost:8081/signin', {
							method: 'POST',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(user)
					});

					if (!rawResponse.ok) {
							throw new Error(`${rawResponse.status}`);
					}

					const content = await rawResponse.json();

					dataUser.name = content.name;
					dataUser.token = content.token;
					dataUser.refreshToken = content.refreshToken;
					dataUser.userId = content.userId;
					dataUser.message = content.message;
			}
			catch (err) {
					if (err instanceof Error) dataUser.errCode = err.message;
			}
	};

	// получение пользователя по id
	export const getUser = async (id: string, token: string) => {
			const rawResponse = await fetch(`http://localhost:8081/users/${id}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
			 }
			});
			return rawResponse.json();
		};

	// получение нового токена пользователя
	export const getNewTokenUser = async (id: string, refreshToken: string) => {
			const rawResponse = await fetch(`http://localhost:8081/users/${id}/tokens`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${refreshToken}`,
			 }
			});
			return rawResponse.json();
		};

	function getLocalStorageUser() {
		if (localStorage.getItem('nameUser')) {
			dataUser.token = <string>localStorage.getItem('token');
			dataUser.userId = <string>localStorage.getItem('userId');
			dataUser.name = <string>localStorage.getItem('nameUser');
		}
	}
	window.addEventListener('load', getLocalStorageUser);

	export async function getWords(page: number, group: number) {
		const response = await fetch(`http://localhost:8081/words?page=${page}&group=${group}`, {
		  method: 'GET',
		  headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		  }
		});
		const words = await response.json();
		return words;
	  }

  export const getWord = async (id:string) => {
  const response = await fetch(`http://localhost:8081/words/${id}`);
  const data = await response.json();
  return data;
  };

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

	  export const createUserWord = async (userId: string, wordId: string, word: object) => {
		const rawResponse = await fetch(`http://localhost:8081/users/${userId}/words/${wordId}`, {
		  method: 'POST',
		  headers: {
			'Authorization': `Bearer ${dataUser.token}`,
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(word)
		});
		const content = await rawResponse.json();
	  };

	  export const updateUserWord = async (userId: string, wordId: string, word: object) => {
		const rawResponse = await fetch(`http://localhost:8081/users/${userId}/words/${wordId}`, {
		  method: 'PUT',
		  headers: {
			'Authorization': `Bearer ${dataUser.token}`,
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(word)
		});
		const content = await rawResponse.json();
	  };

    export const getUserWord = async (userId:string, wordId:string) => {
      const rawResponse = await fetch(`http://localhost:8081/users/${userId}/words/${wordId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${dataUser.token}`,
          Accept: 'application/json',
        },
      });
      const content = await rawResponse.json();
      return content;
    };

	  export const getUserWords = async (userId: string) => {
		try {
		  const rawResponse = await fetch(`http://localhost:8081/users/${userId}/words`, {
			method: 'GET',
			headers: {
			  'Authorization': `Bearer ${dataUser.token}`,
			  'Accept': 'application/json',
			}
		  });
		  if (!rawResponse.ok) {
			throw new Error(`${rawResponse.status}`);
		  }
		  const content = await rawResponse.json();
		  return content;

		} catch (err) {
		  if (err instanceof Error) dataUser.errCode = err.message;
		}
	  };

//запрос для удаления слова
export const deleteUserWord = async (userId: string, wordId: string) => {

	await fetch(`http://localhost:8081/users/${userId}/words/${wordId}`, {
	  method: 'DELETE',
	  headers: {
		'Authorization': `Bearer ${dataUser.token}`,
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	  },
	});
  };

