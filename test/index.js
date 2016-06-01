
/*!
 * Module dependencies.
 */

const commands = require('redis-commands');
const { pedisify, RedisClient: { prototype: proto } } = require('../');

describe('Pedis', () => {
  describe('Promisify', () => {
    it('should return promisify function', () => {
      let promisified = pedisify((...rest) => rest[rest.length - 1](null, true));
      return promisified(1,2,3);
    })

    it('should catch error', () => {
      let promisified = pedisify((...rest) => rest[rest.length - 1](new Error('Hello World!')));
      return promisified(1,2,3)
        .catch(err => {
          console.assert(err.message === 'Hello World!');
          return true;
        });
    })

    it('should save context', function () {
      class a { constructor () { this.c = 1; } b(cb) { cb(null, this.c); } }
      a.prototype.b = pedisify(a.prototype.b);

      let A = new a();
      return A.b().then(c => console.assert(c === 1));
    })

  })

  describe('Redis', () => {
    it('should have all thenable functions', () => {
      commands.list.forEach((command) => {
        if (command != 'multi') {
          console.assert(proto[command].name === 'thenable');
          console.assert(proto[command.toUpperCase()] === proto[command]);
        }
      });
    })
  })
})
