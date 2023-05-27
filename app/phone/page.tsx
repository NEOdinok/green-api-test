import { NextPage } from "next";
import PhoneCard from "@/components/phoneCard/PhoneCard";

const PhoneSelector: NextPage = () => {
	return (
		<main className="flex flex-col items-center justify-center flex-grow w-full max-w-xl overflow-hidden">
			<PhoneCard />
		</main>
	);
}
 
export default PhoneSelector;
