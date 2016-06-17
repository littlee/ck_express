var browserHistory = require('react-router').browserHistory;

function isSignedIn() {
	return localStorage.getItem('jwt') !== null;
}

module.exports = {
	ajaxLoading: function() {
		return function(req) {
			req.once('request', function() {
				if (document.getElementById('ck-loading') !== null) {
					document.getElementById('ck-loading').style.display = 'block';
				}
			});

			req.once('end', function() {
				if (document.getElementById('ck-loading') !== null) {
					document.getElementById('ck-loading').style.display = 'none';
				}
			});
		};
	},

	ajaxAuth: function() {
		return function(req) {
			req.set('Authorization', 'Bearer ' + localStorage.getItem('jwt'));
			req.on('response', function(res) {
				if (res.status === 401) {
					localStorage.removeItem('jwt');
					localStorage.removeItem('uid');
					browserHistory.push({
						pathname: '/signin',
						state: {
							nextPathname: location.pathname + location.search
						}
					});
				}
			});
		};
	},

	setJWT: function(t) {
		localStorage.setItem('jwt', t);
	},

	getJWT: function() {
		return localStorage.getItem('jwt');
	},

	setUser: function(u) {
		localStorage.setItem('uid', u);
	},

	getUser: function() {
		return localStorage.getItem('uid');
	},

	requireAuth: function(nextState, replace) {

		if (!isSignedIn()) {
			localStorage.setItem('wx_path_state', nextState.location.pathname);
			sessionStorage.setItem('uc_path_state', nextState.location.pathname);
			replace({
				pathname: '/signin',
				state: {
					nextPathname: nextState.location.pathname
				}
			});
		}
	},

	timestampToDate: function(ts) {
		var d = new Date(ts);
		return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
	}
};