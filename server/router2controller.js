const fs = require('fs');
const router = require('koa-router')();

function addMapping(router, mapping) {
  for (const url in mapping) {
    const path = url.split(' ')[1]
    if (url.startsWith('GET ')) {
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else if (url.startsWith('PUT ')) {
      router.put(path, mapping[url]);
      console.log(`register URL mapping: PUT ${path}`);
    } else if (url.startsWith('DELETE ')) {
      router.del(path, mapping[url]);
      console.log(`register URL mapping: DELETE ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}

function addControllers(router, dir) {
  fs.readdirSync(__dirname + '/' + dir).filter(f => {
    return f.endsWith('.js');
  }).forEach(f => {
    console.log(`process controller: ${f}...`);
    const mapping = require(__dirname + '/' + dir + '/' + f);
    addMapping(router, mapping);
  });
}

module.exports = function(dir) {
  addControllers(router, dir || 'controller');
  return router.routes();
};