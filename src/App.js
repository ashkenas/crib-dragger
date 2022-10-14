import { useState } from "react";
import EncryptedInput from "./EncryptedInput";
import ManyTimePad from "./ManyTimePad";

function App() {
    const [encrypted, setEncrypted] = useState([]);
    const [messageLength, setMessageLength] = useState(0);

    if (!encrypted.length)
        return <EncryptedInput setEncrypted={setEncrypted} setMessageLength={setMessageLength} />;
    else return <ManyTimePad encrypted={encrypted} messageLength={messageLength} />;
}

export default App;
