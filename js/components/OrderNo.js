require('../../less/order-no.less');
var React = require('react');

var OrderNo = React.createClass({
	render: function() {
		return (
			<div className="order-no">
				<div className="order-no-img"/>
				<p>暂无订单</p>
			</div>
			);
	}
});

module.exports = OrderNo;