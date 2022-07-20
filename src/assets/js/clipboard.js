(function (window, document, undefined) {
  /* global ClipboardJS */

  function initialize() {
    init();
  }

  function init() {
    document.querySelector('#copy-button').addEventListener('click', () => {
      ClipboardJS.copy(document.querySelector('#after-textarea'));
    });
  }

  initialize();
})(window, document);
