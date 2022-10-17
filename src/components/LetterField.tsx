import * as React from 'react';

interface LetterFieldProps {
  value: string;
  type: string;
}

export default function LetterField({ value, type }: LetterFieldProps) {
  const getClassName = (type: string): string => {
    return `letter-field ${type}`;
  };

  return <div className={getClassName(type)}>&nbsp;{value}&nbsp;</div>;
}
