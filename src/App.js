import { useState } from "react";
import EncryptedInput from "./EncryptedInput";
import DecryptingPage from "./DecryptingPage";

export default function App() {
	const [encrypted, setEncrypted] = useState([]);

	if (!encrypted.length)
		return <EncryptedInput setEncrypted={setEncrypted} />;
	else return <DecryptingPage encrypted={encrypted} />;
};
