'use client'
import Image from "next/image";
import logo from "../../public/green-api-logo.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import store from "@/stores/store";
import { useEffect } from "react";

const PhoneCard = () => {
	const router = useRouter();

	useEffect(() => {
		if (!store.apiTokenInstance || !store.apiTokenInstance) router.replace('/');
	}, []);

	const [number, setNumber] = useState('');

	const handleProceed = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		console.log('proceed');
		store.recieverNumber = number; 
		router.replace('/messenger');
	};

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
							Номер получателя
						</h1>

						<form className={"space-y-4 md:space-y-6"} action="#">
							<div>
								<label htmlFor="phone" className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Номер получателя:</label>
								<input
									type="phone"
									name="phone"
									id="apitoken"
									placeholder="79031231122"
									className={"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
									required 
									onChange={(e) => setNumber(e.target.value)}
								/>
							</div>

							<button
								className={"w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"}
								onClick={(e: React.MouseEvent) => handleProceed(e)}
							>
								Proceed
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
 
export default observer(PhoneCard);
