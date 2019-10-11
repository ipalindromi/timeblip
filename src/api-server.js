/**
 * This file contains any "magic" that this framework provides.
 */
const { Pool } = require('pg');
const Hapi = require('@hapi/hapi');

const { findMethods, findPlugins, findRoutes } = require('./server-helpers.js');

exports.init = options => {
	return Hapi.server(options);
};

exports.defaultServerSetup = async (server, { logger, preMethodBind } = {}) => {
	const pool = new Pool({
		connectionString: process.env.DATABASE_URL,
		idleTimeoutMillis: 30000,
		connectionTimeoutMillis: 2000,
	});

	// This binding gets set as `this` throughout the system, including server methods.
	// NOTE: This WILL NOT WORK with arrow functions!
	// see: https://github.com/hapijs/hapi/blob/master/API.md#-serverbindcontext
	server.bind({
		log: (tags, message) => server.log(tags, message),
		pool,
	});

	// We register this early so we can log out other setup events
	if (logger) {
		server.events.on('log', logger);
	}

	if (process.env.NODE_ENV === 'development') {
		server.ext('onRequest', (request, h) => {
			server.log(['info'], request.path);
			return h.continue;
		});
	}

	// These occur syncronously
	findPlugins().forEach(plugin => server.register(plugin));
	findRoutes().forEach(route => server.route(route));
	findMethods().forEach(([name, method]) => {
		const binding = preMethodBind ? preMethodBind(name, method) : '';
		if (binding === false) return;
		binding ? server.method(name, method, binding) : server.method(name, method);
	});
};
