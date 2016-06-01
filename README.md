# Redis! Pedis!

Pedis is promiserify [redis](https://github.com/NodeRedis/node_redis) module.

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  [![Linux Build][travis-image]][travis-url]
  [![Test Coverage][coveralls-image]][coveralls-url]

## Installation

```bash
$ npm install pedis
```

Using redis with native promises is easy:

```JavaScript
var redis = require('pedis');
```

Now you can use `redis` object as usual, but each command will return a promise:

```JavaScript
var client = redis.createClient();
client.set('key', 'value')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

