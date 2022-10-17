import * as React from 'react';
import LetterField from './LetterField';

interface WordFieldProps {
  guess: { value: string; type: string }[];
  hints: Object[];
}

export default function WordField({ guess, hints }: WordFieldProps) {
  return (
    <div className="word-field">
      {guess.map((letter, index) => (
        <div key={index} className="letter">
          <LetterField value={letter.value} type={letter.type} />
        </div>
      ))}
    </div>
  );
}
