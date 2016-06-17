var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'editaddress(/:aid)',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/EditAddress.js'));
				});
			}
		}
	]
};