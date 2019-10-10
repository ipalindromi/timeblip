/**
 * This is the server entry point.
 *
 * This is where you can put most changes relevant to your application.
 * It is kept separate from api-server to indicate this separation of concerns.
 *
 * We use async for this function to allow for using await
 */
require('dotenv').config();
const { defaultServerSetup, init } = require('./api-server');

/**
 * Best practice function to handle an unhandled promise rejection.
 * @see https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/catchunhandledpromiserejection.md
 */
process.on('unhandledRejection', err => {
	console.log(err);
	process.exit(1);
});

// We use async here to allow for await syntax from initialization,
// and the IIFE helps keep the file contextual.
(async () => {
	// This gets us a server object.
	// It is unconfigured, and not started.
	const server = await init({
		port: process.env.PORT || 5000,
		host: process.env.HOST || '0.0.0.0',
	});

	// Server will be hooked up with any requested routes, methods, or plugins.
	await defaultServerSetup(server, {
		logger: _defaultLogger,
	});

	await server.start();

	server.log(['info'], `Server running at: ${server.info.uri}`);
})();

function _defaultLogger(event, tags) {
	event.timestamp = new Date(event.timestamp);
	console.log(event);
}
