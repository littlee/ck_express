var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'addresslist',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/AddressList.js'));
				});
			}
		}
	]
};