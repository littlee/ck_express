require('../../less/order-detail.less');

var React = require('react');
var OrderDetailUtil = require('../utils/OrderDetailUtil.js');

var OrderDetail = React.createClass({
	statics: {
		loadProps: function(params, cb) {
			var q = {};
			q.orderSerialNum = params.params.osn;
			OrderDetailUtil.getData(q, function(res) {
				cb(null, {
					canvassionAddr: res.canvassionAddr,
					canvassionTimeStr: res.canvassionTimeStr,
					freightCenter: res.freightCenter,
					logisticCompany: res.logisticCompany,
					orderSerialNum: res.orderSerialNum,
					orderTimeStr: res.orderTimeStr,
					status: res.status
				});
			});
		}
	},

	getInitialState: function() {
		return {
			isOpen: false
		};
	},

	render: function() {
		return (
			<div className="row">
				<div className="col-xs-12 trim-col">
					<div className="order-detail">
						<div className="order-detail-header">
							发货单详情
						</div>

						<div className="order-detail-num">
							<span className="order-detail-num-key">
								发货单号
							</span>
							<span className="order-detail-num-val">
								{this.props.orderSerialNum}
							</span>
						</div>

						<div className="order-detail-status">
							<div className={'order-detail-status-item' + (this.props.status === 2 ? ' active' : '')}>
								<span className="order-detail-status-icon"/>
								<span className="order-detail-status-name">
									已揽货
								</span>
								{
									this.props.status === 2 ?
									<span className="order-detail-status-time">
										{this.props.canvassionTimeStr}
									</span> : null
								}
							</div>
							<div className={'order-detail-status-item' + (this.props.status === 1 ? ' active' : '')}>
								<span className="order-detail-status-icon"/>
								<span className="order-detail-status-name">
									未揽货
								</span>
								<span className="order-detail-status-time">
									{this.props.orderTimeStr}
								</span>
							</div>
						</div>

						<div className="order-detail-info">
							<div className="order-detail-info-pair">
								<div className="order-detail-info-key">
									批发市场
								</div>
								<div className="order-detail-info-val">
									{this.props.canvassionAddr.market}
								</div>
							</div>
							<div className="order-detail-info-pair">
								<div className="order-detail-info-key">
									档口号
								</div>
								<div className="order-detail-info-val">
									{this.props.canvassionAddr.stalls}
								</div>
							</div>
							<div className="order-detail-info-pair">
								<div className="order-detail-info-key">
									联系人
								</div>
								<div className="order-detail-info-val">
									{this.props.canvassionAddr.name}
								</div>
							</div>
							<div className="order-detail-info-pair">
								<div className="order-detail-info-key">
									联系电话
								</div>
								<div className="order-detail-info-val">
									{this.props.canvassionAddr.phone}
								</div>
							</div>
							<div className="order-detail-info-pair">
								<div className="order-detail-info-key">
									货运中心
								</div>
								<div className="order-detail-info-val">
									{this.props.freightCenter.name}
								</div>
							</div>
							<div className="order-detail-info-pair">
								<div className="order-detail-info-key">
									物流公司
								</div>
								<div className="order-detail-info-val">
									{this.props.logisticCompany.name}
								</div>
							</div>
						</div>						
					</div>
				</div>
			</div>
			);
	}
});

module.exports = OrderDetail;