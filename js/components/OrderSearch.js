require('../../less/order-search.less');

var React = require('react');
var browserHistory = require('react-router').browserHistory;

var OrderItem = require('./OrderItem.js');
var OrderNo = require('./OrderNo.js');

require('ladda/dist/ladda.min.css');
var LaddaButton = require('react-ladda');
var OrderSearchUtil = require('../utils/OrderSearchUtil.js');

var OrderSearch = React.createClass({
	statics: {
		loadProps: function(params, cb) {
			if (params.params.osn) {
				var q = {};
				q.orderSerialNum = params.params.osn;
				OrderSearchUtil.getData(q, function(res) {
					cb(null, {
						osn: q.orderSerialNum,
						hasNextPage: res.hasNextPage,
						pageNum: res.pageNum,
						list: res.list
					});
				});
				return;
			}

			cb(null, {
				osn: '',
				hasNextPage: false,
				pageNum: 1,
				list: []
			});

		}
	},

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			hasNextPage: this.props.hasNextPage,
			pageNum: this.props.pageNum,
			osn: this.props.params.osn || '',
			list: this.props.list,
			loading: false
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			osn: nextProps.osn,
			list: nextProps.list
		});
	},

	render: function() {
		var items = this.state.list.map(function(item, index) {
			return (
				<OrderItem {...item} key={index} />
				);
		});

		return (
			<div className="row">
				<div className="col-xs-12 trim-col">
					<div className="order-search">
						<div className="order-search-header">
							<button type="button" className="order-search-header-back" onClick={this._goBack}>
								<span className="glyphicon glyphicon-menu-left" />
							</button>
							<span>
								订单搜索
							</span>
						</div>
						<div className="order-search-input">
							<div className="order-search-input-btn">
								<button type="button" className="btn btn-default" disabled={this.state.osn.trim() === ''} onClick={this._search}>
									搜索
								</button>
							</div>
							<div className="input-group order-search-input-group">
								<span className="input-group-addon">
									<span className="glyphicon glyphicon-search"/>
								</span>
								<input type="search" className="form-control" placeholder="搜索订单号" value={this.state.osn} onChange={this._typeOsn}/>
							</div>
						</div>

						<div className="order-search-items">
							{
								items.length > 0 ? items : <OrderNo />
							}

							{
								this.state.hasNextPage ?
								<div className="order-search-load">
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

	_goBack: function() {
		browserHistory.goBack();
	},

	_typeOsn: function(e) {
		this.setState({
			osn: e.target.value
		});
	},

	_search: function() {
		this.context.router.replace('/ordersearch/' + this.state.osn);
	},

	_toggleLoading: function() {
		this.setState({
			loading: !this.state.loading
		});
	},

	_loadMore: function() {
		var q = {};
		q.orderSerialNum = this.state.osn;
		q.page = this.state.pageNum + 1;
		this._toggleLoading();

		OrderSearchUtil.getData(q, function(res) {
			this._toggleLoading();
			this.setState({
				hasNextPage: res.hasNextPage,
				pageNum: res.pageNum,
				list: this.state.list.concat(res.list)
			});
		}.bind(this));
	}
});

module.exports = OrderSearch;