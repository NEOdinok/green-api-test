import { makeAutoObservable } from "mobx";
import { chatMessageType } from "@/types";

class Store {
	idInstance: string = ''
	apiTokenInstance: string = ''
	recieverNumber: string = ''
	chatMessages: Array<chatMessageType> = [];

  pushMessage = (msg: chatMessageType) => {
		this.chatMessages.push(msg);
  }

	constructor() {
    makeAutoObservable(this);
  }
}

export default new Store();
