exports.helloWorld = {
	path: '/hello-world',
	method: 'GET',
	handler: (req, h) => {
		req.server.methods.test();
		return h.response('hello world!').code(200);
	},
};
