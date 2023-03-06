import { statsContent } from "./stats-content";
import { waitRender } from "../../core/components/waitRender";
import { updateUserStatistic,  
	createUserWord, 
	updateUserWord,
 loginUser } from '../../core/components/api/api';

 import { userStatistic, getUserStatistic } from './script';
 import { dataUser  } from "../../core/components/interfaces/interface";

export class Stats {
	private container : HTMLElement;
	private userId: string;

	constructor() {}

	waitRender() {
		return waitRender();
	}

	async render() {
		return statsContent(this.userId);
  }

	async loginUser() {
		if(localStorage.getItem('email')!=undefined) {
			this.userId = dataUser.userId;
			loginUser({'email': localStorage.getItem('email'), 'password': localStorage.getItem('password')})
		}
	}
}