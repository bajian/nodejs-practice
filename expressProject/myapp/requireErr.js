//require�����ڵ��ļ��ᱨ�����������������
  try {
    assets = require('./assets.json');
  } catch (e) {
    console.error('You must execute `make build` before start app when mini_assets is true.');
    throw e;
  }