'use client'

import { useState } from "react";

const WordVerifier = () => {
  const [inputText, setInputText] = useState('');
  const [leftWord, setLeftWord] = useState('');
  const [rightWord, setRightWord] = useState('');

  const verifyWords = (text) => {
    const words = text.split(' ');
    let left = '';
    let right = '';

    // Find the word containing exactly one '@'
    const atIndex = words.findIndex(word => word.includes('@') && word.indexOf('@') === word.lastIndexOf('@'));

    if (atIndex !== -1) {
      const atIndexWords = words[atIndex].split('@');
      left = atIndexWords[0];
      right = atIndexWords[1];
    } else {
      left = 'No word with exactly one "@" found.';
    }

    setLeftWord(left);
    setRightWord(right);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleVerify = () => {
    verifyWords(inputText);
  };

  return (
    <div>
      <input type="text" value={inputText} onChange={handleInputChange} placeholder="Enter text..." />
      <button onClick={handleVerify}>Verify</button>
      <div>
        <p>Left Word: {leftWord}</p>
        <p>Right Word: {rightWord}</p>
      </div>
    </div>
  );
};

export default WordVerifier;