module.exports = {
    VERSION: '1.0.01',
    dev: {
        env: require('./env.dev'),
        gulp: require('../gulp/gulpfile.dev'),
        webpack: require('../webpack/webpack.conf.dev')
    },
    prod: {
        env: require('./env.prod'),
        gulp: require('../gulp/gulpfile.prod'),
        webpack: require('../webpack/webpack.conf.prod')
    }
};