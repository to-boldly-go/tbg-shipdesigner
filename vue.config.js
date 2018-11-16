/* eslint-env node */

const path = require('path');

module.exports = {
	pages: {
		shipdesigner: './src/shipdesigner.js',
		partbuilder: './src/partbuilder.js',
		csvimporter: './src/csvimporter.js',
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.resolve('src'),
				'#': path.resolve('dist'),
			},
		},
	},
};
