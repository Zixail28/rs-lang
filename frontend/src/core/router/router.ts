import { IRoute } from '../components/interfaces/interface';
import { Main } from '../../pages/main';
import { Authentication } from '../../pages/authentication';
import { Stats } from '../../pages/stats';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { authScr } from '../../pages/authentication/script';
import { headerScript } from '../components/header/script';
import { AudioCall } from '../../pages/audiocall/audiocall';
import { sprintScript } from '../../pages/sprint/app';
import { Book, Dictionary } from '../../pages/book/index';
import { loginUser } from '../components/api/api';
import { infoBook } from '../../pages/audiocall/utils/utils';

const headerInst = new Header();
const footerInst = new Footer();
const mainInst = new Main();
const statsInst = new Stats();
const authenticationInst = new Authentication();
const audioCall = new AudioCall();

export class Router {
  private readonly routes: Array<IRoute>;

  private defaultRoute: IRoute;

  constructor(private rootElement: HTMLElement) {

    this.routes = [
      {
        name: '/',
        component: () => {
          const header = document.createElement('div');
          this.rootElement.append(header);
          header.outerHTML = headerInst.render();
					if (localStorage.getItem('nameUser')) headerScript();

          const main = document.createElement('div');
          this.rootElement.append(main);
          main.outerHTML = mainInst.render();

          const footer = document.createElement('div');
          this.rootElement.append(footer);
          footer.outerHTML = footerInst.render();

          document.body.style.overflow = '';
          infoBook.isFromBook = false;
        },
      },
      {
        name: '/authentication',
        component: () => {
					if (localStorage.getItem('nameUser')) {location.href = '#/'; return};

          const header = document.createElement('div');
          this.rootElement.append(header);
          header.outerHTML = headerInst.render();
					if (localStorage.getItem('nameUser')) headerScript();

          const authentication = document.createElement('div');
          this.rootElement.append(authentication);
          authentication.outerHTML = authenticationInst.render();

          authScr();

          document.body.style.overflow = 'hidden';
          infoBook.isFromBook = false;
        },
      },
			{
        name: '/stats',
        component: () => {
					if (!localStorage.getItem('nameUser')) {location.href = '#/'; return};

          const header = document.createElement('div');
          this.rootElement.append(header);
          header.outerHTML = headerInst.render();
					if (localStorage.getItem('nameUser')) headerScript();

          const stats = document.createElement('div');
          this.rootElement.append(stats);
					const getLink = async () => {
						await statsInst.loginUser();
            stats.outerHTML = await statsInst.render();
          }
					stats.innerHTML = statsInst.waitRender()
          getLink();

          //authScr();

					const footer = document.createElement('div');
          this.rootElement.append(footer);
          footer.outerHTML = footerInst.render();

          document.body.style.overflow = '';
          infoBook.isFromBook = false;
        },
      },
      {
        name: '/audiocall',
        component: () => {
          const header = document.createElement('div');
          this.rootElement.append(header);
          header.outerHTML = headerInst.render();
					if (localStorage.getItem('nameUser')) headerScript();

          const audioGame = document.createElement('div');
          this.rootElement.append(audioGame);
          const getLink = async () => {
            audioGame.outerHTML = await audioCall.render();
            await audioCall.page_scripts();
          }
          getLink();

          document.body.style.overflow = '';
        },
      },
      {
        name: '/sprint',
        component: () => {
          const header = document.createElement('div');
          this.rootElement.append(header);
          header.outerHTML = headerInst.render();
					if (localStorage.getItem('nameUser')) headerScript();

          const app = document.createElement('div');
          app.classList.add('app');
          this.rootElement.appendChild(app);

          sprintScript();

          document.body.style.overflow = '';
        },
      },
      {
        name: '/book',
        component: () => {
          const header = document.createElement('div');
          this.rootElement.append(header);
          header.outerHTML = headerInst.render();
					if (localStorage.getItem('nameUser')) headerScript();

          const app = document.createElement('div');
          app.classList.add('book-app');
          this.rootElement.appendChild(app);

          Book();

          const footer = document.createElement('div');
          this.rootElement.append(footer);
          footer.outerHTML = footerInst.render();

          document.body.style.overflow = '';
        },
      },
      {
        name: '/dictionary',
        component: () => {
          const header = document.createElement('div');
          this.rootElement.append(header);
          header.outerHTML = headerInst.render();
					if (localStorage.getItem('nameUser')) headerScript();

          const app = document.createElement('div');
          app.classList.add('book-app');
          this.rootElement.appendChild(app);

          Dictionary();

          const footer = document.createElement('div');
          this.rootElement.append(footer);
          footer.outerHTML = footerInst.render();

          document.body.style.overflow = '';
        },
      },
    ];

    this.defaultRoute = {
      name: 'Default router',
      component: () => {
        this.rootElement.innerHTML = 'Default Page';
      },
    };

    if(localStorage.getItem('email')!='') loginUser({'email': localStorage.getItem('email'), 'password': localStorage.getItem('password')})
  }

  updateRouter(): void {
    this.rootElement.innerHTML = '';
    const currentRouteName = window.location.hash.slice(1);
    const currentRoute = this.routes.find(
      (page) => page.name === currentRouteName,
    );
    (currentRoute || this.defaultRoute).component();
  }

  initRouter(): void {
    if (window.location.hash === '') {
      window.location.hash = '#/';
    }

    window.onpopstate = () => this.updateRouter();
    this.updateRouter();
  }
}
