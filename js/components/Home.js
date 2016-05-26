var React = require('react');

var Home = React.createClass({
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
						Hosssme
					</h1>
				</div>
			</div>
			);
	}
});

module.exports = Home;