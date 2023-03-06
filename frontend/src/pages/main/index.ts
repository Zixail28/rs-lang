import { mainContent } from "./main-content";

export class Main {
  private container : HTMLElement;

  constructor() {}

  render(): string {
    return mainContent();
  }
};