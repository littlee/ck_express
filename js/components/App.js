var React = require('react');

var Loading = require('./Loading.js');

var App = React.createClass({

	getInitialState: function() {
		return {
			loading: false
		};
	},

	render: function() {
		return (
			<div id="ck-container" className={this.state.loading ? 'loading' : ''}>
				<div className="container-fluid">
					{this.props.children}
				</div>
				<Loading />
			</div>
			);
	}
});

module.exports = App;