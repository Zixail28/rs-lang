import { Router } from "../router/router";

const body = document.querySelector('body');
const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
body.append(wrapper);

export class App {
  private container : HTMLElement;
  private router : Router;

  constructor(){
    this.container = document.querySelector('.wrapper');
		this.router = new Router(this.container);
  }

	init(): void {
    this.router.initRouter();
  }
};