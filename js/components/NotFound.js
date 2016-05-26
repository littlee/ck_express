var React = require('react');

var NotFound = React.createClass({

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