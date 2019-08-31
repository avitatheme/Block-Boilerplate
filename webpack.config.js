const { resolve } = require("path");
const webpack = require("webpack");
const argv = require("yargs").argv;

const BundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtract = require("mini-css-extract-plugin");
const ErrorNotification = require("webpack-error-notification");
const DuplicatePackageChecker = require("duplicate-package-checker-webpack-plugin");

const webpackModules = {
	rules: [
		{
			test: /\.js$/,
			use: ["babel-loader"],
			exclude: /node_modules/,
		},
		{
			test: /\.css$/,
			use: [MiniCssExtract.loader, "css-loader"],
		},
		{
			test: /\.scss$/,
			use: [MiniCssExtract.loader, "css-loader", "sass-loader"],
		},
		{
			test: /\.(png|gif|jpg|jpeg|woff|woff2|eot|ttf|svg)$/,
			use: ["url-loader"],
		},
	],
};

const pluginConfig = {
	mode: "development",
	entry: {
		editor: "./src/plugin/src/index.js",
		frontend: "./src/plugin/assets/js/src/index.js",
	},
	output: {
		path: resolve("./src/plugin/assets/js/dist"),
		filename: "[name].js",
	},
	module: webpackModules,
	externals: {
		"@wordpress/api-fetch": "wp.apiFetch",
		"@wordpress/blocks": "wp.blocks",
		"@wordpress/element": "wp.element",
		"@wordpress/editor": "wp.editor",
		"@wordpress/block-editor": "wp.blockEditor",
		"@wordpress/i18n": "wp.i18n",
		"@wordpress/components": "wp.components",
		"@wordpress/compose": "wp.compose",
		"@wordpress/rich-text": "wp.richText",
		"@wordpress/hooks": "wp.hooks",
		"@wordpress/plugins": "wp.plugins",
		"@wordpress/server-side-render": "wp.serverSideRender",
		"@wordpress/dom": "wp.dom",
		"@wordpress/dom-ready": "wp.domReady",
		"@wordpress/html-entities": "wp.htmlEntities",
		"@wordpress/keycodes": "wp.keycodes",
		"@wordpress/shortcode": "wp.shortcode",
		"@wordpress/core-data": "wp.coreData",
		"@wordpress/blob": "wp.blob",
		"@wordpress/media-utils": "wp.mediaUtils",
		"@wordpress/escape-html": "wp.escapeHtml",
		"@wordpress/data-controls": "wp.dataControls",
		"@wordpress/date": "wp.date",
		"@wordpress/notices": "wp.notices",
		"@wordpress/nux": "wp.nux",
		"@wordpress/token-list": "wp.tokenList",
		"@wordpress/url": "wp.url",
		"@wordpress/viewport": "wp.viewport",
		"@wordpress/wordcount": "wp.wordcount",
		"@wordpress/is-shallow-equal": "wp.isShallowEqual",
		"@wordpress/block-library": "wp.blockLibrary",
		"@wordpress/block-serialization-default-parser": "wp.blockSerializationDefaultParser",
		"@wordpress/block-serialization-spec-parser": "wp.blockSerializationSpecParser",
		react: "React",
		"react-dom": "ReactDOM",
		lodash: "lodash",
		jquery: "jQuery",
	},
	resolve: {
		alias: {
			assets: resolve(__dirname, "./src/plugin/assets/"),
			utilities: resolve(__dirname, "./src/plugin/src/utils/"),
			HOC: resolve(__dirname, "./src/plugin/src/components/atoms/__HOC/"),
			atoms: resolve(__dirname, "./src/plugin/src/components/atoms/"),
			molecules: resolve(__dirname, "./src/plugin/src/components/molecules/"),
		},
	},
	stats: {
		colors: true,
	},
	plugins: [
		new webpack.ProvidePlugin({
			_: "lodash",
			_merge: ["lodash", "merge"],
			_map: ["lodash", "map"],
			_times: ["lodash", "times"],
			_each: ["lodash", "each"],
			_isNumber: ["lodash", "isNumber"],
			$: "jquery",
			jQuery: "jquery",
			Component: ["@wordpress/element", "Component"],
			__: ["@wordpress/i18n", "__"],
			sprintf: ["@wordpress/i18n", "sprintf"],
		}),
		new MiniCssExtract({
			filename: "../scss/generic/gen_[name].scss",
		}),
		new ErrorNotification(),
		new DuplicatePackageChecker(),
	],
	devtool: "cheap-module-source-map",
};

if (argv.mode === "production") {
	delete pluginConfig.devtool;
}

if (argv.analytic) {
	pluginConfig.plugins.push(new BundleAnalyzer());
	delete pluginConfig.devtool;
}

module.exports = pluginConfig;
