import { authenticationContent } from "./authentication-content";

export class Authentication {
	private container : HTMLElement;

	constructor() {}

	render(): string {
		return authenticationContent();
	}
}