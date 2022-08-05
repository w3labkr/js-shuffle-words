(function (window, document, undefined) {
  /* global ClipboardJS */

  function initialize() {
    init();
  }

  function init() {
    document.getElementById('copy-button').addEventListener('click', () => {
      handleShuffle();
      ClipboardJS.copy(document.getElementById('result'));
    });
  }

  function handleShuffle() {
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
