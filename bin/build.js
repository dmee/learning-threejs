const inquirer = require('inquirer');
const chalk = require('chalk');
const shell = require('shelljs');
const Config = require('./config/index');

inquirer.prompt({
    type: 'list',
    name: 'env',
    message: '请选择运行模式：',
    choices: [{
        name: '1.开发模式',
        short: '开发模式',
        value: 'development'
    }, {
        name: '2.正式模式',
        short: '正式模式',
        value: 'production'
    }]
}).then(answers => {
    var env = answers.env;
    process.env.NODE_ENV = env;
}).catch(e => {
    console.info(e);
});