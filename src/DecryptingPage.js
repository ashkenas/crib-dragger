import { useState } from "react";
import CribDragger from "./CribDragger";
import WordInput from "./WordInput";

export default function DecryptingPage({ encrypted }) {
  const [word, setWord] = useState('');

  return (<>
    <WordInput setWord={setWord} />
    <CribDragger encrypted={encrypted} word={word} />
  </>);
};
