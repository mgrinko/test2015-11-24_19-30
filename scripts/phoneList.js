'use strict';

let template = require('./../templates/phoneListTemplate.html');

module.exports = class PhoneList {
  constructor(options) {
    this._el = options.element;

    this._template = template;
    this._compiledTemplate = _.template(this._template);

    this._el.innerHTML = this._compiledTemplate({
      phones: options.phones
    });

    this._el.addEventListener('click', this._onPhoneClick.bind(this))
  }

  _onPhoneClick(event) {
    var phoneElement = event.target.closest('.phone');

    if (!phoneElement) {
      return;
    }

    event.preventDefault();

    var phoneSelectedEvent = new CustomEvent('phoneSelected', {
      detail: {
        phoneId: phoneElement.dataset.phoneId
      }
    });

    this._el.dispatchEvent(phoneSelectedEvent);
  }
};


