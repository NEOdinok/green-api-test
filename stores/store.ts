import { makeAutoObservable } from "mobx";

class Store {
	idInstance: string = ''
	apiTokenInstance: string = ''
	recieverNumber: string = ''

	constructor() {
    makeAutoObservable(this);
  }
}

export default new Store();
