'use strict';

let Filter = require('./filter');
let PhoneList = require('./phoneList');

module.exports = class Page {
  constructor(options) {
    this._el = options.element;
    this._content = this._el.querySelector('.main-content');

    var request = this._sendRequest({
      method: 'GET',
      url: './data/phones.json'
    });

    request.then(this._onPhonesListLoaded.bind(this));
  }

  _onPhonesListLoaded(phones) {
    this._init({ phones: phones });
  }

  _init(options) {
    this._filter = new Filter({
      element: this._el.querySelector('[data-component=filter]')
    });

    this._phoneList = new PhoneList({
      element: this._el.querySelector('[data-component=phone-list]'),
      phones: options.phones
    });

    this._phoneList._el.addEventListener('phoneSelected', this._onPhoneSelected.bind(this));
  }

  _onPhoneSelected(event) {
    var requestPromise = this._sendRequest({
      method: 'GET',
      url: `./data/phones/${event.detail.phoneId}.json`
    });

    var mouseoutPromise = this._createMouseoutPromise();

    Promise.all([requestPromise, mouseoutPromise])
      .then(this._onPhoneDetailsLoaded.bind(this))
      .catch(e => console.log(e));
  }

  _onPhoneDetailsLoaded(results) {
    var phoneData = results[0];

    this._renderPhone(phoneData);
  }

  _renderPhone(phoneData) {
    this._content.innerHTML = `<img src="${phoneData.images[0]}">`;
  }

  _sendRequest(options) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.open(options.method, options.url, true);

      xhr.onload = function() {
        if (xhr.status !== 200) {
          reject( new Error(xhr.status + ': ' + xhr.statusText) );
        } else {
          //options.successCallback(JSON.parse(xhr.responseText));
          resolve(JSON.parse(xhr.responseText));
        }
      };

      xhr.onerror = function() {
        reject( new Error(xhr.status + ': ' + xhr.statusText) );
      };

      xhr.send();
    });
  }

  _createMouseoutPromise() {
    return new Promise(function(resolve, reject) {
      this._phoneList._el.addEventListener('mouseout', function(event) {
        //if (!event.target.classList.contains('phone')) {
        //  return;
        //}

        resolve(true);
      });
    }.bind(this));
  }
};
