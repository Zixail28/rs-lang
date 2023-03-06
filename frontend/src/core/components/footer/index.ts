import { footerContent } from "./footer-content";

export class Footer {
	private container : HTMLElement;

	constructor() {}

	render(): string {
		return footerContent();
	}
}