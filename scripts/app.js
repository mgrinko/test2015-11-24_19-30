'use strict';

require('./../styles/main.css');

let Page = require('./page');

var app = new Page({
  element: document.getElementById('application'),
  phonesUrl: './data/phones.json'
});