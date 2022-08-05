/*!
 * Copyright (c) 2022 W3LabKr
 * js-shuffle-words - 
 * @version v0.2.0
 * @link https://github.com/w3labkr/js-shuffle-words#readme
 * @license ISC
 */
"use strict";

(function (window, document, undefined) {
  function initialize() {
    init();
  }

  function init() {
    document.getElementById('copy-button').addEventListener('click', handleSubmit);
  }

  function handleSubmit(e) {
    let lines = document.getElementById('text').value.replace(/\r\n/g, '\n').split('\n');
    let prefix = document.getElementById('prefix').value;
    let suffix = document.getElementById('suffix').value;
    let result = [];
    lines.forEach(function (words) {
      let word = randomArrayShuffle(words.split(' '));
      let text = '';

      if (prefix.length) {
        word.unshift(prefix);
      }

      if (suffix.length) {
        word.push(suffix);
      }

      result.push(word.join(' '));
    });
    document.getElementById('result').innerHTML = result.join('\n');
  }

  function randomArrayShuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  initialize();
})(window, document);
//# sourceMappingURL=shuffle.js.map
