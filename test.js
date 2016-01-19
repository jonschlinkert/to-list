'use strict';

require('mocha');
var assert = require('assert');
var toList = require('./');

describe('to-list', function() {
  it('should export a function', function() {
    assert.equal(typeof toList, 'function');
  });

  it('should create a list array', function() {
    var str = [
      '- This is item 1',
      '- This is item 2',
      '- This is item 3',
      '  * This is sub-item A',
      '  * This is sub-item B',
      '  * This is sub-item C'
    ].join('\n');

    var list = toList(str);
    assert(list.length === 6);
  });

  it('should create one level for every two spaces', function() {
    var str = [
      '- This is item 1',
      '- This is item 2',
      '- This is item 3',
      '  * This is sub-item A',
      '  * This is sub-item B',
      '  * This is sub-item C'
    ].join('\n');

    var list = toList(str);
    assert(list[0].level === 0);
    assert(list[3].level === 2);
  });

  it('should add the original `lead` to the object', function() {
    var str = [
      '- This is item 1',
      '- This is item 2',
      '- This is item 3',
      '  * This is sub-item A',
      '  * This is sub-item B',
      '  * This is sub-item C'
    ].join('\n');

    var list = toList(str);

    assert(list[0].lead === '- ');
    assert(list[3].lead === '  * ');
  });

  it('should support passing a custom item function', function() {
    var str = [
      '- This is item 1',
      '- This is item 2',
      '- This is item 3',
      '  * This is sub-item A',
      '  * This is sub-item B',
      '  * This is sub-item C'
    ].join('\n');

    var list = toList(str, function(item) {
      item.level = item.level / 2;
      return item;
    });

    assert(list[0].level === 0);
    assert(list[3].level === 1);
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      toList();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected a string');
      cb();
    }
  });
});
