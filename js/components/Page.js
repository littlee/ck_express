require('../../less/page.less');

var React = require('react');
var PageUtil = require('../utils/PageUtil.js');

var Page = React.createClass({
	statics: {
		loadProps: function(params, cb) {
			PageUtil.getData(function(res) {
				cb(null, {p:res});
			});
		}
	},

	render: function() {
		var p = this.props.p.map(function(item, index) {
			return (
				<p key={index}>{item}</p>
				);
		});

		return (
			<div className="row">
				<div className="col-xs-12">
					<div className="page">
						<h1 className="text-center">
							Page
						</h1>
						{p}
					</div>
				</div>
			</div>
			);
	}
});

module.exports = Page;