import { headerContentNotAuth } from "./header-content-not-auth";
import { headerContentAuth } from "./header-content-auth";

export class Header {
  private container : HTMLElement;

  constructor() {}

  render(): string {
		if (localStorage.getItem('nameUser')) {
			return headerContentAuth();
		} else {
			return headerContentNotAuth();
		}
  }
};