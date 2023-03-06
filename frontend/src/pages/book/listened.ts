import {
  createItemHardWord, createBook, createItem
} from './render';
import {createUserWord, deleteUserWord, getWords} from '../../core/components/api/api';
import { dataUser } from "../../core/components/interfaces/interface";
import { infoBook } from '../audiocall/utils/utils';


export function showGroup():void {
  const parent = <HTMLElement>document.querySelector('.nav_group-list');
  const parentItem = parent.querySelectorAll('.nav_group-list-title');
  parent.addEventListener('click', (event) => {
    event.preventDefault();
    const itemClear = document.getElementById('main_word-container') as HTMLElement;
    itemClear.innerHTML = '';
    const target = event.target as HTMLElement;
    const idGroup: string = target.id;
    if (target.classList.contains('nav_group-list-title')) {
      for (let i = 0; i < parentItem.length; i++) {
        parentItem[i].classList.remove('active_group');
      }
      target.classList.add('active_group');
      infoBook.group = +idGroup;
      infoBook.page = 0;
      getWords(infoBook.page, infoBook.group );
      createBook();

    }
  });
}

export function showItem():void {
    const el =   document.getElementById('main_word-container') as HTMLElement;
    el.addEventListener('click', (event) => {
    event.preventDefault();
    const itemClear = document.getElementById('main_word-review') as HTMLElement;
    itemClear.innerHTML = '';
    const target = event.target as HTMLElement;
    const idShow = target.id;
    if ((target.classList.contains('main_word-items')) && (target.nodeName === 'LI')) {
      createItem(idShow);
    }
     else {
      createItemHardWord(idShow);
    }
  });
}

export function showPaginationGroup():void {
  const pag = document.getElementById('pagination') as HTMLElement;
  pag.addEventListener('click', (event) => {

    event.preventDefault();
    const containerClear = document.getElementById('main_word-container') as HTMLElement;
    containerClear.innerHTML = '';

    const activeGroup = <HTMLElement>document.querySelector('.active_group');
    infoBook.group = +activeGroup.id;

    const target = event.target as HTMLElement;
    if (target.classList.contains('page')) {
      infoBook.page = +target.innerHTML -1 ;

      getWords(infoBook.page, infoBook.group);
      createBook();
    }
  });
}


export function ManipulateItem():void {
  const containerWords = <HTMLElement>document.querySelector('#main_word-container');
  containerWords.addEventListener('click', async (e) => {
  const elem = e.target as HTMLElement;


  if (elem.classList.contains('btn-hard_word')) {
    const idCurrentWord = <string>elem.dataset.hard;

    const idCurrentUser = dataUser.userId;

    const currentWord = { "difficulty": "hard" };

    const btnHard = <HTMLElement>document.querySelector(`button[data-hard='${idCurrentWord}']`);
    btnHard.classList.add('hard_word-select');
    btnHard.setAttribute('disabled', 'true');
    createUserWord(idCurrentUser, idCurrentWord, currentWord);
  }

  if (elem.classList.contains('btn-hard-restore')) {
    const idCurrentWord = <string>elem.dataset.restore;
    const idCurrentUser = dataUser.userId;
    await deleteUserWord(idCurrentUser, idCurrentWord);
    createBook();
  }
});
}

export function showDictionary () {
  document.addEventListener('DOMContentLoaded', function(e){
  setTimeout(function(){
        let myElement = document.querySelector('.dictionary') as HTMLElement;
        myElement.click()
    }, 5000)
})
}
