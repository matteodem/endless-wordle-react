import React, { useState } from 'react';
import Keyboard from './components/Keyboard';
import WordField from './components/WordField';
import { pickWordleWord, wordleWords } from './wordle-list';
import './style.css';

const initialGuessFields = [
  { value: '', type: 'blank' },
  { value: '', type: 'blank' },
  { value: '', type: 'blank' },
  { value: '', type: 'blank' },
  { value: '', type: 'blank' },
];

const jsonDeepClone = (val) => JSON.parse(JSON.stringify(val));

export default function App() {
  const [guesses, setGuesses] = useState([
    jsonDeepClone(initialGuessFields),
    jsonDeepClone(initialGuessFields),
    jsonDeepClone(initialGuessFields),
    jsonDeepClone(initialGuessFields),
    jsonDeepClone(initialGuessFields),
    jsonDeepClone(initialGuessFields),
  ]);

  const [wordHints, setWordHints] = useState([]);

  const [state, setState] = useState('playing');

  const [currentWord] = useState(pickWordleWord());

  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);

  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  const playAgain = () => {
    window.location.reload();
  };

  const currentGuessToString = () => {
    return guesses[currentGuessIndex].reduce(
      (guessString, letter) => `${guessString}${letter.value}`,
      ''
    );
  };

  const analyzeWord = (): boolean => {
    const guessedWord = currentGuessToString();

    // @ts-ignore: includes on Array
    if (!wordleWords.includes(guessedWord)) {
      setState('invalid-guess');
      return false;
    }

    setState('playing');

    const hints = guesses[currentGuessIndex].map((letter, index) => {
      let type = 'no-match';

      if (currentWord.charAt(index) === letter.value) {
        type = 'perfect-match';
      } else if (currentWord.includes(letter.value)) {
        type = 'match';
      }

      return {
        type,
        value: letter.value,
      };
    });

    guesses[currentGuessIndex] = hints;

    setGuesses(guesses);

    const hasWon = hints.every((hint) => hint.type === 'perfect-match');

    if (hasWon) setState('win');

    if (currentGuessIndex === 5 && state !== 'win') {
      setState('loss');
    }

    setWordHints([...wordHints, ...hints]);

    return true;
  };

  const onKeyboardClick = (value) => {
    if (state === 'win' || state === 'loss') {
      return;
    }

    if (value === 'delete') {
      if (currentLetterIndex === 0) {
        return;
      }

      guesses[currentGuessIndex][currentLetterIndex - 1] = {
        value: '',
        type: 'blank',
      };

      setCurrentLetterIndex(currentLetterIndex - 1);

      setGuesses(guesses);

      setState('playing');
    } else if (value === 'enter') {
      if (currentLetterIndex < 5) {
        return;
      }

      const validWord = analyzeWord();

      if (validWord) {
        setCurrentGuessIndex(currentGuessIndex + 1);
        setCurrentLetterIndex(0);
      }
    } else if (value.length === 1) {
      if (currentLetterIndex === 5) {
        return;
      }

      guesses[currentGuessIndex][currentLetterIndex] = {
        type: 'letter',
        value,
      };

      console.log(guesses);

      setGuesses(guesses);

      setCurrentLetterIndex(currentLetterIndex + 1);
    }
  };

  return (
    <div id="app">
      <h1>Endless Wordle</h1>

      {guesses.map((guess, index) => (
        <WordField key={index} guess={guess} hints={wordHints} />
      ))}
      <div v-for="guess in guesses"></div>

      {state === 'invalid-guess' && (
        <div className="invalid-box">
          Invalid guess, word is not in database.
        </div>
      )}

      {(state === 'win' || state === 'loss') && (
        <div className="result-box">
          {state === 'win' && (
            <div className="invalid-box">
              Awesome! You found the word: {currentWord}.
            </div>
          )}
          {state === 'loss' && (
            <div className="invalid-box">
              Sorry, you did not find the word: {currentWord}.
            </div>
          )}
          <a href="" onClick={playAgain}>
            Play again?
          </a>
        </div>
      )}

      <Keyboard hints={wordHints} guess={onKeyboardClick} />
    </div>
  );
}
