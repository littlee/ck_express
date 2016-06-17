require('../../less/order-list.less');

var React = require('react');
var classNames = require('classnames');
var Link = require('react-router').Link;
var OrderItem = require('./OrderItem.js');
var OrderNo = require('./OrderNo.js');

require('ladda/dist/ladda.min.css');
var LaddaButton = require('react-ladda');
var OrderListUtil = require('../utils/OrderListUtil.js');

var OrderList = React.createClass({

	statics: {
		loadProps: function(params, cb) {
			var q = {};
			q.status = params.params.status || '';
			OrderListUtil.getData(q, function(res) {

				cb(null, {
					hasNextPage: res.hasNextPage,
					pageNum: res.pageNum,
					list: res.list
				});
			});
		}
	},

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			loading: false,
			hasNextPage: this.props.hasNextPage,
			pageNum: this.props.pageNum,
			list: this.props.list
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			hasNextPage: nextProps.hasNextPage,
			pageNum: nextProps.pageNum,
			list: nextProps.list
		});
	},

	render: function() {
		var status = this.props.params.status;
		if (!status) {
			status = '';
		}


		var items = this.state.list.map(function(item, index) {
			return (
				<OrderItem {...item} key={index} />
				);
		});

		return (
			<div className="row">
				<div className="col-xs-12">
					<div className="order-list">
						<div className="order-list-tabs">
							<div className={classNames({
								'order-list-tab': true,
								'active': status === ''
							})} onClick={this._switchTab.bind(this, '')}>
								全部订单
							</div>
							<div className={classNames({
								'order-list-tab': true,
								'active': status === '1'
							})} onClick={this._switchTab.bind(this, '1')}>
								待揽货订单
							</div>
							<div className={classNames({
								'order-list-tab': true,
								'active': status === '2'
							})} onClick={this._switchTab.bind(this, '2')}>
								已揽货订单
							</div>
							<span className="order-list-refresh" onClick={this._refresh}>
								<span className="glyphicon glyphicon-refresh"/>
							</span>
							<Link to="/ordersearch" className="order-list-search">
								<span className="glyphicon glyphicon-search" />
							</Link>
						</div>

						<div className="order-list-items">
							{items.length > 0 ? items : <OrderNo />}

							{
								this.state.hasNextPage ?
								<div className="order-list-load">
									<LaddaButton loading={this.state.loading} buttonStyle="zoom-out" onClick={this._loadMore}>
										点击加载更多
									</LaddaButton>
								</div> : null
							}
						</div>
					</div>
				</div>
			</div>
			);
	},

	_switchTab: function(t) {
		this.context.router.push('/orderlist/' + t);
	},

	_refresh: function() {
		window.location.reload();
	},

	_toggleLoading: function() {
		this.setState({
			loading: !this.state.loading
		});
	},

	_loadMore: function() {
		var q = {};
		q.status = this.props.params.status || '';
		q.page = this.state.pageNum + 1;
		this._toggleLoading();

		OrderListUtil.getData(q, function(res) {
			this._toggleLoading();
			this.setState({
				hasNextPage: res.hasNextPage,
				pageNum: res.pageNum,
				list: this.state.list.concat(res.list)
			});
		}.bind(this));
	}
});

module.exports = OrderList;