import { useState } from "react";
import CribDragger from "./CribDragger";
import WordInput from "./WordInput";
import "./DecryptingPage.css"

export default function DecryptingPage({ data }) {
  const [word, setWord] = useState('');

  return (
    <div className="container">
      <WordInput setWord={setWord} />
      <CribDragger data={data} word={word} />
    </div>
  );
};
