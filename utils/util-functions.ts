import axios from "axios";
import { chatMessageType } from "@/types";

const getCurrentTime = (): string => {
	const currentDate = new Date();
	return `${currentDate.getHours()}` + `:` + `${currentDate.getMinutes()}`;
}

const timestampToDate = (timestamp: number) => {
	const milliseconds = timestamp * 1000;
	const dateObject = new Date(milliseconds)
	return `${dateObject.getHours()}` + `:` + `${dateObject.getMinutes()}`;
}

export {
	getCurrentTime,
	timestampToDate,
}
