#! /usr/bin/env node

//chmod +x /home/user/bin/node-echo.js
//sudo ln -s /home/user/bin/node-echo.js /usr/local/bin/node-echo
//可通过process.argv获得命令行参数。由于argv[0]固定等于NodeJS执行程序的绝对路径，argv[1]固定等于主模块的绝对路径，因此第一个命令行参数从argv[2]这个位置开始。process.argv.slice(2)