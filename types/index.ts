type chatMessageType = {
	text: string,
	isSent: boolean,
	key: string,
	timeSent: string
}

interface ResSuccess {
  delivered: boolean;
}

interface ResErrorWithDetails {
  errorMessage: string;
}

export {
	type chatMessageType,
	type ResSuccess,
	type ResErrorWithDetails,
}
