require('../../less/ship-success.less');
var React = require('react');
var browserHistory = require('react-router').browserHistory;

var ShipSuccess = React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="col-xs-12 trim-col">
					<div className="ship-success">
						<img src="./images/noti_success.jpg" width="100%"/>

						<div className="ship-success-info">
							<div className="ship-success-order">
								您的订单号为；{this.props.location.query.osn}
							</div>
							<div className="ship-success-tips">
								如果需要查看货运中心的接单情况，可以通过“发货管理”-“发货订单管理”进行查看！
							</div>

							<button type="button" className="btn btn-primary ship-success-btn" onClick={this._goBack}>
								返回
							</button>
						</div>
					</div>
				</div>
			</div>
			);
	},

	_goBack: function() {
		browserHistory.goBack();
	}
});

module.exports = ShipSuccess;