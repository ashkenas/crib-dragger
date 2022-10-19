import { useState } from "react";
import EncryptedInput from "./EncryptedInput";
import ManyTimePad from "./ManyTimePad";
import WordInput from "./WordInput";

function App() {
    const [encrypted, setEncrypted] = useState([]);
    const [messageLength, setMessageLength] = useState(0);
    const [word, setWord] = useState('');

    if (!encrypted.length) {
        return <EncryptedInput setEncrypted={setEncrypted} setMessageLength={setMessageLength} />;
    } else {
        return (
            <>
                <WordInput setWord={setWord} />
                <ManyTimePad encrypted={encrypted} messageLength={messageLength} word={word} />
            </>
        );
    }
}

export default App;
