'use strict';

let Filter = require('./filter');
let PhoneList = require('./phoneList');

module.exports = class Page {
  constructor(options) {
    this._el = options.element;

    this._el.classList.add('loading');

    var xhr = new XMLHttpRequest();

    xhr.open('GET', './data/phones.json', true);

    xhr.onload = function() {
      this._el.classList.remove('loading');

      if (xhr.status !== 200) {
        alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
      } else {
        var phones = JSON.parse(xhr.responseText);

        this._init({
          phones: phones
        });
      }
    }.bind(this);

    xhr.send();
  }

  _init(options) {
    this._filter = new Filter({
      element: this._el.querySelector('[data-component=filter]')
    });

    this._phoneList = new PhoneList({
      element: this._el.querySelector('[data-component=phone-list]'),
      phones: options.phones
    });

    this._phoneList._el.addEventListener('phoneSelected', this._onPhoneSelected.bind(this))
  }

  _onPhoneSelected(event) {
    console.log('animation enabled');
  }
};
