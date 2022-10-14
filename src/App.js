import { useState } from "react";
import EncryptedInput from "./EncryptedInput";

function App() {
    const [encrypted, setEncrypted] = useState([]);
    if (!encrypted.length)
        return <EncryptedInput setEncrypted={setEncrypted} />;
}

export default App;
