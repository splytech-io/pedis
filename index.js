
/*!
 * Module dependencies.
 */

const redis = require('redis');
const commands = require('redis-commands');

const proto = redis.RedisClient.prototype;

/*!
 * Expose module.
 */

module.exports = redis;
module.exports.promisify =
module.exports.pedisify = pedisify;

/*!
 * Promisify commands.
 */

commands.list.forEach((command) => {
  if (command != 'multi') {
    proto[command] = proto[command.toUpperCase()] = pedisify(proto[command]);
  }
});

redis.Multi.prototype.exec =
redis.Multi.prototype.EXEC =
redis.Multi.prototype.exec_transaction = pedisify(redis.Multi.prototype.exec_transaction);

/**
 * Pedisify return thenable function.
 *
 * @param {Function} fn
 * @return {Function}
 */

function pedisify(fn) {
  return function thenable(...rest) {
    return new Promise((resolve, reject) => {
      rest.push((err, result) => err ? reject(err) : resolve(result));

      fn.apply(this, rest);
    });
  };
};
