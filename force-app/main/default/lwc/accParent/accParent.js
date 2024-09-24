import { LightningElement } from "lwc";

export default class AccParent extends LightningElement {
  searchTextParent=' ';
  handleEvent(event) {
    this.searchTextParent = event.detail;
  }
}
