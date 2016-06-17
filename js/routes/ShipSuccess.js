var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'shipsuccess',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/ShipSuccess.js'));
				});
			}
		}
	]
};