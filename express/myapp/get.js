var config = {
  // debug Ϊ true ʱ�����ڱ��ص���
  debug: false,
  name: "no name",
  get mini_assets() { return !this.debug; },
  set setName(n){this.name=n;}
  }
  
  
  console.log(config.mini_assets);
  config.setName='bajian';
    console.log(config.name);