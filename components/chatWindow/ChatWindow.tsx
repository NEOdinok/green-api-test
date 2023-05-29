'use client'
import { useEffect, useState } from "react";
import store from "@/stores/store";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import axios from "axios";
import Message from "@/components/message/Message";
import { setIntervalAsync, clearIntervalAsync } from "set-interval-async";
import { getCurrentTime } from "@/utils/util-functions";
import { chatMessageType } from "@/types";
import { timestampToDate } from "@/utils/util-functions";

const ChatWindow = () => {

	const router = useRouter();
	const [message, setMessage] = useState<string | number | readonly string[] | undefined>('');

	useEffect(() => {
		if (!store.apiTokenInstance || !store.apiTokenInstance || !store.recieverNumber) router.replace('/');

		const polling = setIntervalAsync(async () => {
			const id = await checkForNotification();
			if (id) await deleteNotification(id);
			else console.log('[useEffect] wait...');
		}, 1500);

		return () => {
			clearIntervalAsync(polling);
		};
	}, []);

	const checkForNotification = async () => {
		try {
			const res = await axios.post(`/api/check-for-notification`, {
				apiUrl: 'api.green-api.com',
				id: store.idInstance,
				apiToken: store.apiTokenInstance,
			});
			
			console.log('[messenger check]', res);

			if (!res.data) {
				console.log('[check] no notifications'); 
				return null;
			}
			else if (
				res.data.body.typeWebhook
				&& res.data.body.typeWebhook === "incomingMessageReceived"
				&& res.data.body.senderData.sender === `${store.recieverNumber}@c.us`
			) {
				console.log('[check] found message to render!');

				store.pushMessage({
					text: res.data.body.messageData.textMessageData.textMessage as string, 
					isSent: false, 
					key: `${res.data.body.idMessage}`,
					timeSent: timestampToDate(res.data.body.timestamp),
				});
				return res.data.receiptId;
			}
			else {
				console.log('[check] got message, but not go render')
				return res.data.receiptId;
			}
		} catch (error) {
			console.warn({ error })
		}
	}

	const deleteNotification = async (id: number) => {
		try {
			let config = {
				method: 'DELETE',
				maxBodyLength: Infinity,
				url: `https://api.green-api.com/waInstance1101825531/deleteNotification/f3e7db6cbbfd4d1da50fa4764f1c96fc64c94432bc4f41debd/${id}`,
			};
			const response = await axios.request(config);
			console.log('[delete]', response);

			// const res = await axios.post(`/api/delete-notification`, {
			// 	notificationId: id,
			// 	apiUrl: 'api.green-api.com',
			// 	id: store.idInstance,
			// 	apiToken: store.apiTokenInstance,
			// });
			// console.log('[messenger delete]', res);
		} catch (error) {
			console.warn({ error });
		}
	}

	const sendMessage = async (e: React.MouseEvent) => {
		try {
			e.preventDefault();
			e.stopPropagation();

			const data = JSON.stringify({
				"chatId": `${store.recieverNumber}@c.us`,
				"message": `${message}`
			});
			
			const config = {
				method: 'post',
				mode: 'no-cors',
				maxBodyLength: Infinity,
				url: `https://
					${process.env.NEXT_PUBLIC_API_URL}
					/waInstance${store.idInstance}
					/sendMessage/${store.apiTokenInstance}`,
				data: data,
			};

			const res = await axios.request(config);

			store.pushMessage({
				text: message as string, 
				isSent: true, 
				key: `${res.data.idMessage}`,
				timeSent: getCurrentTime(),
			});

			setMessage('');
		} catch (error) {
			console.warn({ error });
		}
	}

	const renderMessages = () => (
		store.chatMessages.map(msg => <Message isSent={msg.isSent} message={msg} key={msg.key} />)
	);

	return (
		<div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
			<div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
				{store.chatMessages && renderMessages()}
			</div>

			<div className="bg-gray-300 p-4 flex space-between gap-5 items-center">
				<input 
					className="flex items-center h-10 w-full rounded px-3 text-sm"
					type="text"
					placeholder="Enter your message…"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>

				<button
					type="button"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					onClick={(e: React.MouseEvent) => sendMessage(e)}
				>
					<svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path 
							fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
							clipRule="evenodd">
						</path>
					</svg>
					<span className="sr-only">Icon description</span>
				</button>
			</div>
		</div>
	);
}

export default observer(ChatWindow)