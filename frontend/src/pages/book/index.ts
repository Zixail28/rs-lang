import { bookBody } from './book-model';
import './style.scss';
import './';
import { createBook, createItem } from './render';
import {
  showGroup, showItem, showPaginationGroup, ManipulateItem, showDictionary
} from './listened';
import { Pagination } from './pagination';
import { infoBook } from '../audiocall/utils/utils';


export const Book = () => {
bookBody();
createItem('5e9f5ee35eb9e72bc21af4b1');
createBook();
Pagination();
showGroup();
showItem();
showPaginationGroup();
ManipulateItem();



document.addEventListener('click', event=>{
  if((event.target as HTMLElement).classList.contains('audiocall-btn') || (event.target as HTMLElement).classList.contains('sprint-btn')) {
    infoBook.isFromBook = true;
  }
})
}


export const Dictionary = () => {
  bookBody();
  createItem('5e9f5ee35eb9e72bc21af4b1');
  createBook();
  Pagination();
  showGroup();
  showItem();
  showPaginationGroup();
  ManipulateItem();
  showDictionary ();


  document.addEventListener('click', event=>{
    if((event.target as HTMLElement).classList.contains('audiocall-btn') || (event.target as HTMLElement).classList.contains('sprint-btn')) {
      infoBook.isFromBook = true;
    }
  })
  }


