const merge = require('webpack-merge');
const BaseConf = require('./webpack.conf.base');

module.exports = merge(BaseConf, {
    mode: 'development',
});