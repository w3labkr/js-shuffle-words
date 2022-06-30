"use strict";

(function (window, document, undefined) {
  function initialize() {
    init();
  }

  function init() {
    var textarea = document.getElementById('textarea');
    var pre = document.getElementById('pre');
    textarea.addEventListener('input', handleInput.bind(null, pre));
  }

  function handleInput(pre, e) {
    var lines = e.target.value.replace(/\r\n/g, '\n').split('\n');
    var result = [];
    lines.forEach(function (words) {
      var word = randomArrayShuffle(words.split(' '));
      result.push(word.join(' '));
    });
    pre.innerHTML = result.join('\n');
  }

  function randomArrayShuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

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
