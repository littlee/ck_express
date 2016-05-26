var React = require('react');

var App = React.createClass({
	statics: {
		loadProps: function(params, cb) {
			cb(null, {});
		}
	},

	render: function() {
		return (
			<div id="ck-container">
				<div className="container-fluid">
					{this.props.children}
				</div>
			</div>
			);
	}
});

module.exports = App;