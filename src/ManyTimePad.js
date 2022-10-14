import { useState } from "react";
import "./ManyTimePad.css";

const toCells = (data) => data.map((d, i) => <td key={i}>{d}</td>);

function ManyTimePad({ encrypted, messageLength }) {
    const [guesses, setGuesses] = useState(Array.from(Array(encrypted.length), () => new Array(messageLength)));
    const guess = (i, j) => (e) => {
        guesses[i, j] = e.target.value.substring(0, 1);
        setGuesses(guesses);
    };

    const rows = [];
    for (let i = 0; i < encrypted.length; i++) {
        const messageChars = [];
        const guessInputs = [];
        let message = encrypted[i];

        for (let j = messageLength - 1; j >= 0; j--) {
            messageChars.unshift(String.fromCharCode(Number(message & 255n)));
            message >>= 8n;

            guessInputs.unshift(<input type="text" onChange={guess(i, j)} value={guesses[i][j]}/>)
        }

        rows.push(<tr key={i}>{toCells(messageChars)}</tr>);
        rows.push(<tr key={i + messageLength}>{toCells(guessInputs)}</tr>);
    }

    return (
        <table>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default ManyTimePad;