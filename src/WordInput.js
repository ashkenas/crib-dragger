import "./WordInput.css";

export default function WordInput({ setWord }) {
  const onChange = (e) => setWord(e.target.value);

  return (<>
    <label htmlFor="guess">Guess a Word</label>
    <p>
      Enter any word you think might appear anywhere in the plaintext. If
      there's a chance it's present, cells in the grid below will highlight
      to show you where to try your guess. Use the revealed text in the other
      messages and your best judgement to determine if your guess is right,
      and use the revealed context to continue uncovering your plaintext.
    </p>
    <input id="guess" type="text" onChange={onChange} placeholder="Guess" />
  </>);
};
