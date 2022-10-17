import * as React from 'react';

interface KeyboardProps {
  guess: Function;
  hints: any;
}

// TODO: put into interfaces.tsx
interface Key {
  value: String
}

const keyboardKeys = [
  { value: 'q' },
  { value: 'w' },
  { value: 'e' },
  { value: 'r' },
  { value: 't' },
  { value: 'z' },
  { value: 'u' },
  { value: 'i' },
  { value: 'o' },
  { value: 'p' },
  { value: 'a' },
  { value: 's' },
  { value: 'd' },
  { value: 'f' },
  { value: 'g' },
  { value: 'h' },
  { value: 'j' },
  { value: 'k' },
  { value: 'l' },
  { value: 'enter' },
  { value: 'y' },
  { value: 'x' },
  { value: 'c' },
  { value: 'v' },
  { value: 'b' },
  { value: 'n' },
  { value: 'm' },
  { value: 'delete' },
],
;

export default function Keyboard({ guess, hints }: KeyboardProps) {
  const getHint = (key: Key): string => {
    const { value } = key;

    const matched = hints.filter((hint) => hint.value === value);

    if (matched.length === 0) {
      return;
    }

    const newestMatch = matched[matched.length - 1];

    if (newestMatch) {
      return newestMatch.type;
    }

    return ''
  }

  const getClassName = (key: Key): string => {
    const classNames = ['key'];

    if (key.value === 'enter') {
      classNames.push('enter-key');
    } else if (key.value === 'delete') {
      classNames.push('delete-key');
    }

    classNames.push(getHint(key));

    return classNames.join(' ');
  };

  return <div className="keyboard">
    {keyboardKeys.map(key => (
    <div
      className={getClassName(key)}
      key={key.value}
      onClick={() => guess(key.value)}>

      {key.value.length === 1 && <div>{key.value.toUpperCase()}</div>}
      {key.value === 'enter' && <div className="enter">ENTER</div>}
      {key.value === 'delete' && <div className="enter">DELETE</div>}
    </div>))}
</div>;
}
