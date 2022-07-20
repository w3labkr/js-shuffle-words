(function (window, document, undefined) {
  function initialize() {
    init();
  }

  function init() {
    document.getElementById('submit-button').addEventListener('click', handleSubmit);
  }

  function handleSubmit(e) {
    let lines = document.getElementById('before-textarea').value.replace(/\r\n/g, '\n').split('\n');
    let result = [];

    lines.forEach(function (words) {
      let word = randomArrayShuffle(words.split(' '));
      result.push(word.join(' '));
    });

    document.getElementById('after-textarea').innerHTML = result.join('\n');
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
