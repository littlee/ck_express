require('../../less/order-item.less');

var React = require('react');
var Link = require('react-router').Link;
var A = require('../A.js');

var OrderItem = React.createClass({
	render: function() {
		var statusMap = {
			'1': '未揽货',
			'2': '已揽货'
		};
		return (
			<Link to={'/orderdetail/' + this.props.orderSerialNum} className="order-item">
				<div className="order-item-header">
					物流公司：{this.props.logisticCompany.name}
				</div>
				<div className="order-item-body">
					<div className="order-item-info">
						发货单号：{this.props.orderSerialNum}
					</div>
					<div className="order-item-info">
						发货时间：{A.timestampToDate(this.props.orderTime)}
					</div>
					<div className="order-item-info">
						状态：{statusMap[this.props.status]}
					</div>
					<span className="order-item-arrow">
						<span className="glyphicon glyphicon-menu-right" />
					</span>
				</div>
			</Link>
			);
	}
});

module.exports = OrderItem;