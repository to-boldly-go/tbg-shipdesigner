const path = require('path');

module.exports = {
	devtool: 'cheap-module-source-map',
	resolve: {
		modules: [
			path.resolve('./src'),
			path.resolve('./node_modules'),
		],
		alias: {
			'@': path.resolve('src'),
			'#': path.resolve('dist'),
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.vue$/,
				use: [
					'vue-loader',
				],
			},
			{
				test: /\.raw\./,
				use: [
					'raw-loader',
				],
			},
			{
				test: /\.csv$/,
				exclude: /(node_modules|bower_components|\.raw\.)/,
				loader: 'csv-loader',
				options: {
					dynamicTyping: true,
					header: true,
					skipEmptyLines: true,
				},
			},
		],
	},
	mode: 'development',
};
