/* eslint-env node */

const path = require('path');
const nodeExternals = require('webpack-node-externals');

const common = require('./webpack.config-base.js');

const webapp = {
	entry: {
		'shipdesigner': './src/shipdesigner.js',
		'partbuilder': './src/partbuilder.js',
		'csvimporter': './src/csvimporter.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: "/",
		filename: '[name].js',
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 8001,
		host: '0.0.0.0',
		disableHostCheck: true,
	},
};

const scripts = {
	entry: {
		'import-parts': './src/scripts/import-parts.js',
	},
	target: 'node',
	externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
	output: {
		path: path.resolve(__dirname, 'bin'),
		filename: '[name].js',
	},
};

module.exports = [
	Object.assign({}, common, webapp),
	Object.assign({}, common, scripts),
];
