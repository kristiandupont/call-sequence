const fs = require('fs');
const util = require('util');
const logFile = fs.createWriteStream('log.txt', { flags: 'a' });

const stack = [];

function log () {
  logFile.write(`${util.format.apply(null, arguments)}\n`);
}

function wrap (f) {
  return function wrapped () {
    const caller = f.name;
    stack.push(caller);
    if (stack.length > 1) {
      const message = 'call';
      log(`${stack[stack.length - 2]}-->${stack[stack.length - 1]}: ${message}`)
    }
    const result = f.apply(this, arguments);
    stack.pop();
    return result;
  }
}

module.exports = {
  log,
  wrap
}
