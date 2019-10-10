const fs = require('fs');
const path = require('path');

const DIR_BASE = __dirname;

exports.findMethods = function findMethods() {
	const methodPath = path.join(DIR_BASE, 'methods');
	const modulePaths = _findFilesInDir(methodPath);

	// Get all exports from each module. Each one is expected to be a HAPI route.
	return modulePaths.reduce((allMethods, modulePath) => {
		Object.entries(require(modulePath)).forEach(([name, method]) =>
			allMethods.push([name, method]),
		);
		return allMethods;
	}, []);
};

/**
 * @returns {array} - An array of route objects
 */
exports.findRoutes = function findRoutes() {
	const routePath = path.join(DIR_BASE, 'routes');
	const modulePaths = _findFilesInDir(routePath);
	// Get all exports from each module. Each one is expected to be a HAPI route.
	return modulePaths.reduce((allRoutes, modulePath) => {
		Object.values(require(modulePath)).forEach(route => allRoutes.push(route));
		return allRoutes;
	}, []);
};

exports.findPlugins = function findPlugins() {
	const pluginPath = path.join(DIR_BASE, 'plugins');
	const modulePaths = _findFilesInDir(pluginPath);
	// Get all exports from each module. Each one is expected to be a HAPI plugin.
	return modulePaths.reduce((allPlugins, modulePath) => {
		Object.values(require(modulePath)).forEach(plugin => allPlugins.push(plugin));
		return allPlugins;
	}, []);
};

function _findFilesInDir(scandirPath) {
	const foundPaths = fs.readdirSync(scandirPath);
	return foundPaths
		.filter(file => !fs.statSync(path.join(scandirPath, file)).isDirectory())
		.map(file => path.join(scandirPath, file));
}
