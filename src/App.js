import { useState } from "react";
import EncryptedInput from "./EncryptedInput";
import DecryptingPage from "./DecryptingPage";

export default function App() {
	const [data, setData] = useState(null);

	if (!data)
		return <EncryptedInput setData={setData} />;
	else return <DecryptingPage data={data} />;
};
