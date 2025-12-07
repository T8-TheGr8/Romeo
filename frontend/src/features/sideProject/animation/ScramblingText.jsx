import { useEffect, useState } from "react";
import "./sideProject.css";

const RANDOM_CHARS =
  "!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789abcdefghijklmnopqrstuvwxyz";

function randomChar() {
  return RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
}

export default function ScrambleText({ text }) {
  const [displayChars, setDisplayChars] = useState(text.split(""));
  const [scrambling, setScrambling] = useState([]); // boolean flags per character

  useEffect(() => {
    const finalChars = text.split("");

    // Start scrambled
    const initialScramble = finalChars.map(() => true);
    setScrambling(initialScramble);

    // Random characters for visible scramble
    setDisplayChars(finalChars.map(() => randomChar()));

    // Animate each character independently
    const intervals = finalChars.map((finalChar, i) => {
      let frame = 0;

      return setInterval(() => {
        frame++;

        setDisplayChars((prev) => {
          const next = [...prev];
          next[i] = frame < 18 ? randomChar() : finalChar;
          return next;
        });

        if (frame >= 30) {
          setScrambling((prev) => {
            const next = [...prev];
            next[i] = false; 
            return next;
          });

          clearInterval(intervals[i]);
        }
      }, 40); 
    });

    return () => intervals.forEach(clearInterval);
  }, [text]);

  return (
    <span className="scramble-wrapper">
      {displayChars.map((char, i) => (
        <span
          key={i}
          className={`scramble-char ${scrambling[i] ? "scrambling" : ""}`}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
