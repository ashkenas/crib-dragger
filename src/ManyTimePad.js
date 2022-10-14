import { useState } from "react";
import "./ManyTimePad.css";

const toCells = (data) => data.map((d, i) => <td key={i}>{d}</td>);
const changeIndex = (array, i, value) => array.map((a, j) => j === i ? value : a);
const change2DIndex = (array, i, j, value) => {
    return array.map((a, k) => a.map((b, l) => i === k && j === l ? value : b));
};

function ManyTimePad({ encrypted, messageLength }) {
    const [guesses, setGuesses] = useState(Array.from(Array(encrypted.length), () => Array.from(Array(messageLength), () => '')));
    const [openCols, setOpenCols] = useState(Array.from(Array(messageLength), () => [true, 0]));
    const guess = (i, j) => (e) => {
        const char = e.target.value.substring(e.target.value.length - 1);
        console.log(char);
        setGuesses(change2DIndex(guesses, i, j, char));
        setOpenCols(changeIndex(openCols, j, [!char, i]));
    };

    const rows = [];
    for (let i = 0; i < encrypted.length; i++) {
        const messageChars = [];
        const guessInputs = [];
        let message = encrypted[i];

        for (let j = messageLength - 1; j >= 0; j--) {
            messageChars.unshift(String.fromCharCode(Number(message & 255n)));
            message >>= 8n;

            const disabled = !openCols[j][0] && openCols[j][1] !== i;
            guessInputs.unshift(<input type="text" onChange={guess(i, j)} value={guesses[i][j]} disabled={disabled}/>)
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