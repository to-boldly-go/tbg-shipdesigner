const path = require('path');

const common = {
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		port: 8001,
		host: '0.0.0.0',
		disableHostCheck: true,
	},
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
	mode: "development",
};

const webapp = {
	entry: {
		'shipdesigner': './src/shipdesigner.js',
		'partbuilder': './src/partbuilder.js',
		'csvimporter': './src/csvimporter.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
};

const scripts = {
	entry: {
		'import-parts': './src/scripts/import-parts.js',
	},
    target: 'node',
	output: {
		path: path.resolve(__dirname, 'bin'),
		filename: '[name].js',
	},
};

module.exports = [
	Object.assign({}, common, webapp),
	Object.assign({}, common, scripts),
];
