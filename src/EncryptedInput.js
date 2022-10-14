import { useRef, useState } from "react";
import "./EncryptedInput.css";

function EncryptedInput({ setEncrypted }) {
    const ref = useRef(null);
    const [error, setError] = useState(false);

    const submit = () => {
        if (!ref.current) return;

        const messages = ref.current.value.split('\n').map((m) => m.trim()).filter((m) => m);
        if (messages.length < 2) {
            setError('Must provide at least two messages!');
            return;
        }

        const lengths = messages.map((m) => m.length);
        const allSameLength = lengths.reduce((p, c) => p === c ? c : false, lengths[0]);
        if (!allSameLength) {
            setError('Messages are not all the same length.');
        } else {
            try {
                setEncrypted(messages.map((m) => BigInt(`0x${m}`)));
            } catch (e) {
                setError('Invalid hexadecimal!');
            }
        }
    };

    return (
        <div className="input-container">
            <h1>Enter All Encrypted Messages</h1>
            <h3>One message per line. Messages should be in hexadecimal format.</h3>
            <textarea ref={ref} rows={15}></textarea>
            {error && <h5 style={{color: 'red'}}>{error}</h5>}
            <button onClick={submit}>Begin</button>
        </div>
    )
};

export default EncryptedInput;