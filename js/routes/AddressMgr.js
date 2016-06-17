var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'addressmgr',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/AddressMgr.js'));
				});
			}
		}
	]
};