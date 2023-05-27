'use client'
import { NextPage } from "next";
import { useEffect, useState } from "react";
import store from "@/stores/store";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import axios from "axios";
import Message from "@/components/message/Message";

const Messenger: NextPage = () => {
	const router = useRouter();
	const [message, setMessage] = useState<string | number | readonly string[] | undefined>('');
	const [chatMessages, setChatMessages] = useState<Array<{text: string, isSent: boolean, key: string}>>([]);

	useEffect(() => {
		if (!store.apiTokenInstance || !store.apiTokenInstance || !store.recieverNumber) router.replace('/');
		else console.log('store:', store.apiTokenInstance, store.idInstance, store.recieverNumber);
	}, []);

	const renderSentMessage = () => (
		chatMessages.map(msg => <Message isSent={msg.isSent} message={msg.text} key={msg.key} />)
	)

	const handleSendMessage = async (e: React.MouseEvent) => {
		try {
			e.preventDefault();
			e.stopPropagation();

			//axios send message
			const data = JSON.stringify({
				"chatId": `${store.recieverNumber}@c.us`,
				"message": `${message}`
			});
			
			const config = {
				method: 'post',
				mode: 'no-cors',
				maxBodyLength: Infinity,
				url: `https://api.green-api.com/waInstance${store.idInstance}/sendMessage/1fd3d7b64a6e45218602fa793c6a477ef8f6d034304c4627ab`,
				headers: { 
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
				},
				data : data
			};

			const res = await axios.request(config);
			console.log(res.data.idMessage);

			if (res.status == 200) {
				setChatMessages((prev) => [...prev, {text: message as string, isSent: true, key: `${res.data.idMessage}`}])
			} else {
				console.log('error');
			}

			setMessage('');
		} catch (error) {
			console.warn({ error });
		}
	}

	return (
		<div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
			<div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
				{chatMessages && renderSentMessage()}
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
					onClick={(e: React.MouseEvent) => handleSendMessage(e)}
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

export default observer(Messenger);
