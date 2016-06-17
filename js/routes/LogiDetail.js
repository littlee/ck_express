var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'logidetail',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/LogiDetail.js'));
				});
			}
		}
	]
};