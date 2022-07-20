/*!
 * Copyright (c) 2022 W3LabKr
 * js-shuffle-words - 
 * @version v0.1.0
 * @link https://github.com/w3labkr/js-shuffle-words#readme
 * @license ISC
 */
"use strict";

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
//# sourceMappingURL=clipboard.js.map
