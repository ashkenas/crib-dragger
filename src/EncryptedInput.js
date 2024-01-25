import { useCallback, useState } from "react";
import "./EncryptedInput.css";

export default function EncryptedInput({ setEncrypted }) {
  const [error, setError] = useState(false);

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const messages = data.get('encrypted')
      .split('\n')
      .map((m) => m.trim())
      .filter((m) => m);
    if (messages.length < 2) {
      setError('Must provide at least two messages!');
      return;
    }

    const sameLength = messages.every((m) => m.length === messages[0].length);
    if (!sameLength) {
      setError('The provided messages must all be the same length.');
    } else if (messages[0].length % 2 !== 0) {
      setError('The provided messages each have an odd length; odd-length '
        + 'hexadecimal cannot be converted back to ascii.');
    } else {
      try {
        setEncrypted(messages.map((m) => BigInt(`0x${m}`)));
      } catch (e) {
        setError('At least one message is not valid hexadecimal.');
      }
    }
  }, [setError, setEncrypted]);

  return (
    <div className="input-container">
      <h1>Crib Dragger</h1>
      <p>
        This tool can be used to crack what's known as the <strong>Many Time
        Pad Vulnerability</strong>. Unlike other tools made for this purpose,
        this one enables the user to check more than two messages at once.
      </p>
      <label htmlFor="entry">Encrypted Message Entry</label>
      <p>One message per line. Messages should be in hexadecimal format.</p>
      {error && <p className="error">{error}</p>}
      <form onSubmit={onSubmit}>
        <textarea id="entry" name="encrypted" rows={14} />
        <button type="submit">Begin Decryption</button>
      </form>
    </div>
  );
};
