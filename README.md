# listen-emitter

Mixin for event-emitter inversion of control listen functions

## Useage

```js
var extend = require('extend');
var Emitter = require('events').EventEmitter;
var ListenToEmitter = require('listento-emitter');

// creates class using emitter and listento functions
function AirportEntity() { }
extend(AirportEntity.prototype, Emitter, ListenToEmitter);

// create instances (have listenTo/ListenOnce/stopListening)
var tower = new AirportEntity();
var plane = new AirportEntity();

// tower listens for place.emit calls
tower.listenTo(plane, 'ready-to-land', function () {
  log('the plane is ready to land');
})

// causes tower's listenTo callback to fire
plane.emit('ready-to-land');
```

## Methods

_Methods are defined with the expectation that they will be extended into an instance or prototype of an object.  They won't work as static functions._

### listenTo(obj, events, callback)

Creates a listener that fires callback function when target object events are emitted.

```js
tower.listenTo(plane, 'ready-to-takeoff', function () { })
```

### listenOnce(obj, events, callback)

Creates a listener that fires callback function once when target object events are emitted.

```js
plane.listenOnce(tower, 'thumbs-up', function () { })
```

### stopListening(obj, events, callback)

Removes specified listener. If any of the arguments are undefined, listeners that match remaining arguments will be removed.  If no arguments are passed, all listeners will be removed.

```js
tower.stopListening(plane);
```
