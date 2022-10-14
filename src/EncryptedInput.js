import { useRef } from "react";
import "./EncryptedInput.css";

function EncryptedInput({ setEncrypted }) {
    const ref = useRef(null);

    const submit = () => {
        if (!ref.current) return;

        setEncrypted(ref.current.value.split('\n').map((m) => parseInt(m.trim(), 16)));
    };

    return (
        <div className="input-container">
            <h1>Enter All Encrypted Messages</h1>
            <h3>One message per line. Messages should be in hexadecimal format.</h3>
            <textarea ref={ref} rows={15}></textarea>
            <button onClick={submit}>Begin</button>
        </div>
    )
};

export default EncryptedInput;