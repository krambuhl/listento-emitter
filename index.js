module.exports = {
  listenTo: function(obj, events, cb) {
    addListener(this, createListener(obj, events, cb));
    obj.on(events, cb);
    return this;
  },

  listenOnce: function(obj, events, cb) {
    addListener(this, createListener(obj, events, cb));
    obj.once(events, cb);
    return this;
  },

  stopListening: function(obj, events, cb) {
    var removal = [];
    this._listeningTo = (this._listeningTo || []).filter(function (listener) {
      if (!matches(listener, createListener(obj, events, cb))) return true;
      removal.push(listener);
    });

    removal.forEach(function(listener) {
      listener.obj.off(listener.events, listener.cb);
    });

    return this;
  }
};

function addListener(self, l) {
  if (!self._listeningTo) self._listeningTo = [];
  self._listeningTo.push(l);
}

function matches(chk, match) {
  for (var key in match)
    if (match[key] !== undefined && chk[key] !== match[key])
      return false;

  return true;
}

function createListener(obj, events, cb) {
  return { obj: obj, events: events, cb: cb };
}
