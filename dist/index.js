'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _kombini = require('kombini');

var _kombini2 = _interopRequireDefault(_kombini);

exports['default'] = _kombini2['default'].extend({
  setupListeners: function setupListeners() {
    this._listeningTo = [];
  },

  cleanupListeners: function cleanupListeners() {
    this.stopListening();
  },

  listenTo: function listenTo(obj, events, cb) {
    this._listeningTo.push(createListener(obj, events, cb));
    obj.on(events, cb);
    return this;
  },

  listenOnce: function listenOnce(obj, events, cb) {
    this._listeningTo.push(createListener(obj, events, cb));
    obj.once(events, cb);
    return this;
  },

  stopListening: function stopListening(obj, events, cb) {
    var removal = [];
    this._listeningTo = this._listeningTo.filter(function (listener) {
      if (!matches(listener, createListener(obj, events, cb))) return true;
      removal.push(listener);
    });

    removal.forEach(function (listener) {
      listener.obj.off(listener.events, listener.cb);
    });

    return this;
  }
});

function matches(chk, match) {
  for (var key in match) if (match[key] !== undefined && chk[key] !== match[key]) return false;
  return true;
}

function createListener(obj, events, cb) {
  return { obj: obj, events: events, cb: cb };
}
module.exports = exports['default'];
