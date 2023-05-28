"use client"
import Image from "next/image";
import logo from "../../public/green-api-logo.png";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import store from "@/stores/store";

const LoginCard: React.FC = () => {
	const [id, setId] = useState('');
	const [apiToken, setApiToken] = useState('');
	const router = useRouter();

	const handleLogin = async (e: React.MouseEvent) => {
		try {
			e.preventDefault();
			e.stopPropagation();

			const config = {
				method: 'GET',
				mode: 'no-cors',
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
				}
			};

			const res = await axios.get(`https://
				${process.env.NEXT_PUBLIC_API_URL}
				/waInstance${id}
				/getSettings/${apiToken}`
			, config);

			if (res.status == 200) {
				console.log('succes!');
				store.idInstance = id;
				store.apiTokenInstance = apiToken;
				router.replace('/phone');
			} else {
				console.log('error');
			}
		} catch (error) {
			console.warn({ error });
		}
	}

	return (
		<section className={"bg-gray-50 dark:bg-gray-900"}>
			<div className={"flex flex-col items-center justify-center mx-auto md:h-screen"}>
				<a href="#" className={"flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"}>
					<Image className={"w-8 h-8 mr-2"} src={logo} alt="" />
					Green API
				</a>
				<div className={"w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"}>
					<div className={"p-6 space-y-4 md:space-y-6 sm:p-8"}>
						<h1 className={"text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"}>
							Войдите в аккаунт
						</h1>
						<form className={"space-y-4 md:space-y-6"} action="#">
							<div>
								<label htmlFor="idinstance" className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>idInstance:</label>
								<input 
									type="idinstance"
									name="idinstance"
									id="idinstance"
									placeholder="Your idInstance"
									className={"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} 
									required
									onChange={(e) => setId(e.target.value)}
								/>
							</div>

							<div>
								<label htmlFor="apitoken" className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>apiTokenInstance:</label>
								<input
									type="apitoken"
									name="apitoken"
									id="apitoken"
									placeholder="Yout Token"
									className={"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
									required 
									onChange={(e) => setApiToken(e.target.value)}
								/>
							</div>

							<button
								className={"w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"}
								onClick={(e: React.MouseEvent) => handleLogin(e)}
							>
								Log in
							</button>
							<p className={"text-sm font-light text-gray-500 dark:text-gray-400"}>
								Нет аккаунта? <a href="https://console.green-api.com/" target="_blank" className={"font-medium text-primary-600 hover:underline dark:text-primary-500"}>Создать</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
 
export default observer(LoginCard);
