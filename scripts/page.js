'use strict';

class Page {
  constructor(options) {
    this._el = options.element;

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
    alert(event.detail.phoneId)
  }
}
