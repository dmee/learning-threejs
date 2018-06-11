const WebpackMerge = require('webpack-merge');
const DevEnv = require('./env.dev');

module.exports = WebpackMerge(DevEnv, {
    NODE_ENV: '"production"'
});