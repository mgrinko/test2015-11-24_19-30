'use strict';

class App {
  constructor(options) {
    this._el = options.element;

    this._menu = new Menu({
      element: this._el.querySelector('.menu')
    });

    this._filter = new Filter({
      element: this._el.querySelector('.filter')
    });

    this._filter.getElement().addEventListener('filterValueChanged', this._onFilterValueChanged.bind(this))
  }

  _onFilterValueChanged(event) {
    console.log(event.detail);

    this._menu.filter(event.detail.value);
  }
}

class Menu {
  constructor(options) {
    this._el = options.element;

    this._titleElem = this._el.querySelector('.menu_title');

    this._titleElem.onclick = this._onTitleClick.bind(this);
  }

  filter(value) {
    console.log(`Menu was litered with "${value}"`);
  }

  _onTitleClick(event) {
    this._el.classList.toggle('open');
  }
}

class Filter {
  constructor(options) {
    this._el = options.element;

    this._field = this._el.querySelector('.filter_field');

    this._field.addEventListener('input', this._onFieldInput.bind(this));
  }

  getElement() {
    return this._el;
  }

  _onFieldInput() {
    var event = new CustomEvent('filterValueChanged', {
      detail: {
        value: this._field.value
      }
    });

    alert(this._field.value);

    this._el.dispatchEvent(event);
  }
}
