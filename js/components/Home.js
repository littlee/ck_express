var React = require('react');
var Link = require('react-router').Link;

var Home = React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="col-xs-12">
					<h1 className="text-center">
						jj
					</h1>
					<Link to="/page">page</Link>
				</div>
			</div>
			);
	}
});

module.exports = Home;