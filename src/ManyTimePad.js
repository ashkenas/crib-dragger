import { useEffect, useRef, useState } from "react";
import "./ManyTimePad.css";

const toCells = (data) => data.map((d, i) => <td key={i}>{d}</td>);
const changeIndex = (array, i, value) => array.map((a, j) => j === i ? value : a);
const change2DIndex = (array, i, j, value) => {
    return array.map((a, k) => a.map((b, l) => i === k && j === l ? value : b));
};
const clamp = (value, min, max) => value < min ? min : (value > max ? max : value);

function ManyTimePad({ encrypted, messageLength }) {
    const [focus, setFocus] = useState([0, 0]);
    const [guesses, setGuesses] = useState(Array.from(Array(encrypted.length), () => Array.from(Array(messageLength), () => '')));
    const [openCols, setOpenCols] = useState(Array.from(Array(messageLength), () => [true, 0]));
    const focusRef = useRef(null);

    useEffect(() => {
        if (focusRef.current)
            focusRef.current.focus();
    }, [focus]);

    const handleKeys = (i, j) => (e) => {
        switch (e.keyCode) {
            case 37: // Left
                setFocus([i, clamp(j - 1, 0, messageLength - 1)]);
                break;
            case 38: // Up
                setFocus([clamp(i - 1, 0, encrypted.length - 1), j]);
                break;
            case 39: // Right
                setFocus([i, clamp(j + 1, 0, messageLength - 1)]);
                break;
            case 40: // Down
                setFocus([clamp(i + 1, 0, encrypted.length - 1), j]);
                break;
            default:
                break;
        }
    };

    const guess = (i, j) => (e) => {
        const char = e.target.value.substring(e.target.value.length - 1);
        if (char)
            setFocus([i, clamp(j + 1, 0, messageLength)]);
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
            const focused = i === focus[0] && j === focus[1];
            guessInputs.unshift(
                <input type="text" ref={focused ? focusRef : undefined} onChange={guess(i, j)} onKeyDown={handleKeys(i, j)} value={guesses[i][j]} disabled={disabled}/>
            );
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