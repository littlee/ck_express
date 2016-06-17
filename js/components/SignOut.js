var React = require('react');
var request = require('superagent');

var SignOut = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	componentDidMount: function() {
		localStorage.removeItem('jwt');
		request
			.get('/cooka-user-web/logout')
			.end(function(err, res) {
				if (err) {
					alert(err.status);
					return;
				}
				console.log(res.text);
				this.context.router.replace('/signin');
			}.bind(this));
	},

	render: function() {
		return (
			<div className="row">
				<div className="col-xs-12">
					<h3>正在退出登录...</h3>
				</div>
			</div>
			);
	}
});

module.exports = SignOut;