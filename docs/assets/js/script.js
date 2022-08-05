/*!
 * Copyright (c) 2022 W3LabKr
 * js-shuffle-words - 
 * @version v0.2.1
 * @link https://github.com/w3labkr/js-shuffle-words#readme
 * @license ISC
 */
"use strict";

(function (window, document, undefined) {
  /* global bootstrap, ClipboardJS */
  function initialize() {
    init();
  }

  function init() {
    const toastLiveElement = document.getElementById('liveToast');
    const ClipboardElement = document.getElementById('result');
    document.getElementById('submit').addEventListener('click', () => {
      shuffleWords();
      ClipboardJS.copy(ClipboardElement);
      const toast = new bootstrap.Toast(toastLiveElement);
      toast.show();
    });
  }

  function shuffleWords() {
    const prefix = document.getElementById('prefix');
    const suffix = document.getElementById('suffix');
    let lines = document.getElementById('text').value.replace(/\r\n/g, '\n').split('\n');
    let result = [];
    lines.forEach(function (words) {
      let word = randomArrayShuffle(words.split(' '));
      let text = '';

      if (prefix.value.length) {
        word.unshift(prefix.value);
      }

      if (suffix.value.length) {
        word.push(suffix.value);
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
//# sourceMappingURL=script.js.map
