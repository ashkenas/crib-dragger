import "./WordInput.css";

function WordInput({ setWord }) {
    const onChange = (e) => setWord(e.target.value);

    return <input type="text" onChange={onChange} />;
}

export default WordInput;
