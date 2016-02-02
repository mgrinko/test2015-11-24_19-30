'use strict';

module.exports = class Filter {
  constructor(options) {
    this._el = options.element;

    this._template = `
      <input type="text" class="filter-field">
    `;

    this.render();
  }

  render() {
    this._el.innerHTML = this._template;
  }
};
