/*!
 * to-list <https://github.com/jonschlinkert/to-list>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function toList(str, fn) {
  if (typeof str !== 'string') {
    throw new Error('expected a string');
  }

  if (!fn) fn = identity;
  var lines = str.split(/\r\n|\n/);
  var len = lines.length, i = -1;
  var list = [];

  while (++i < len) {
    var line = lines[i];
    var lead = line.match(/^[-+*\s]+/);
    var orig = lead ? lead[0] : '';
    var level = 0;

    if (lead) {
      var spaces = /^ +/.exec(lead);
      var tabs = /^\t+/.exec(lead);

      if (spaces) {
        level = spaces.length;
      } else if (tabs) {
        level = (tabs.length / 2);
      }
    }

    line = line.slice(orig.length);
    var item = fn({
      text: line,
      lead: lead,
      level: toEven(level)
    });
    list.push(item);
  }
  return list;
};

function identity(item) {
  return item;
}

function toEven(num) {
  return Math.round(num / 2) * 2;
}
