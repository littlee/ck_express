var React = require('react');

var NotFound = React.createClass({
	statics: {
		loadProps: function(params, cb) {
			cb(null, {});
		}
	},
	
	render: function() {
		return (
			<div className="row">
				<div className="col-xs-12">
					<h1 className="text-center">
						404 Not Found
					</h1>
				</div>
			</div>
			);
	}
});

module.exports = NotFound;