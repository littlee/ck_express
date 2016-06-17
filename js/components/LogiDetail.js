require('../../less/logi-detail.less');
var React = require('react');

var LogiDetail = React.createClass({

	getInitialState: function() {
		return {
			companyName: '',
			description: '',
			center: '',
			deliverScope: '',
			workTime: ''
		};
	},

	componentDidMount: function(){
		var data = JSON.parse(sessionStorage.getItem('logi_detail'));
		this.setState({
			companyName: data.companyName,
			description: data.description,
			center: data.center,
			deliverScope: data.deliverScope,
			workTime: data.workTime
		});
	},

	componentWillUnmount: function() {
		sessionStorage.removeItem('logi_detail');
	},

	render: function() {
		return (
			<div className="row">
				<div className="col-xs-12 trim-col">
					<div className="logi-detail">
						<div className="logi-detail-header">
							物流详情
						</div>
						<div className="logi-detail-body">
							<div className="logi-detail-pair">
								<div className="logi-detail-key">
									公司
								</div>
								<div className="logi-detail-value">
									{this.state.companyName}
								</div>
							</div>
							<div className="logi-detail-pair">
								<div className="logi-detail-key">
									描述
								</div>
								<div className="logi-detail-value">
									{this.state.description}
								</div>
							</div>
							<div className="logi-detail-pair">
								<div className="logi-detail-key">
									所属货运中心
								</div>
								<div className="logi-detail-value">
									{this.state.center}
								</div>
							</div>
							<div className="logi-detail-pair">
								<div className="logi-detail-key">
									配送范围
								</div>
								<div className="logi-detail-value">
									{this.state.deliverScope}
								</div>
							</div>
							<div className="logi-detail-pair">
								<div className="logi-detail-key">
									上门揽货服务时间
								</div>
								<div className="logi-detail-value">
									{this.state.workTime}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			);
	}
});

module.exports = LogiDetail;