var ListenTo = require('../index.js');
var EventEmitter = require('event-emitter').methods;
var extend = require('extend');
var test = require('tape');

function TestClass() { }
extend(TestClass.prototype, EventEmitter, ListenTo);

test('object.listenTo(obj, ev, cb)', function (t) {
  t.plan(1);

  var o1 = new TestClass(),
    o2 = new TestClass();

  o1.listenTo(o2, 'test', function (e) { t.equal(e, 'resultz'); });
  o2.emit('test', 'resultz');
});

test('object.listenOnce(obj, ev, cb)', function (t) {
  t.plan(1);

  var counter = 0,
    o1 = new TestClass(),
    o2 = new TestClass();

  o1.listenOnce(o2, 'test', function () { counter++; });

  o2.emit('test');
  o2.emit('test');
  t.equal(counter, 1);
});

test('object.stopListening()', function (t) {
  t.plan(2);

  var counter = 0,
    o1 = new TestClass(),
    o2 = new TestClass();

  o1.listenTo(o2, 'test', function () { counter++; });
  o2.emit('test');
  t.equal(counter, 1);

  o1.stopListening();
  o2.emit('test');
  t.equal(counter, 1);
});

test('object.stopListening(obj)', function (t) {
  t.plan(2);

  var counter = 0,
    o1 = new TestClass(),
    o2 = new TestClass(),
    o3 = new TestClass();

  function count() { counter++; }

  o1.listenTo(o2, 'test', count);
  o1.listenTo(o3, 'test', count);

  o2.emit('test');
  o3.emit('test');
  t.equal(counter, 2);

  o1.stopListening(o3);

  o2.emit('test');
  o3.emit('test');
  t.equal(counter, 3);
});


test('object.stopListening(obj, ev)', function (t) {
  t.plan(2);

  var counter = 0,
    o1 = new TestClass(),
    o2 = new TestClass();

  function count() { counter++; }

  o1.listenTo(o2, 'testa', count);
  o1.listenTo(o2, 'testb', count);

  o2.emit('testa');
  o2.emit('testb');
  t.equal(counter, 2);

  o1.stopListening(o2, 'testb');

  o2.emit('testa');
  o2.emit('testb');
  t.equal(counter, 3);
});
