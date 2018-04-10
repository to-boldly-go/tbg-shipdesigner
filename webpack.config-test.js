const common = require('./webpack.config-base.js');
const nodeExternals = require('webpack-node-externals');

const config = {
	target: 'node',
	externals: [nodeExternals()],
};

module.exports = Object.assign({}, common, config);
