//require不存在的文件会报错，可以利用这个错误
  try {
    assets = require('./assets.json');
  } catch (e) {
    console.error('You must execute `make build` before start app when mini_assets is true.');
    throw e;
  }