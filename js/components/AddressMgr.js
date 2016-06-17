require('../../less/address-mgr.less');

var React = require('react');
var Link = require('react-router').Link;
var AddressMgrUtil = require('../utils/AddressMgrUtil.js');

var AddrMgrItem = React.createClass({
	render: function() {
		return (
			<div className="addr-mgr-item">
				<Link to={'/editaddress/' + this.props.addr.deliveraddrId} className="addr-mgr-item-inner">
					<div className="addr-mgr-item-logo">
						<div className="addr-mgr-item-thumb">
							{this.props.addr.market}
						</div>
					</div>
					<div className="addr-mgr-item-info">
						<div>
							<span className="addr-mgr-item-name">
								{this.props.addr.name}
							</span>
							<span className="addr-mgr-item-phone">
								{this.props.addr.phone}
							</span>
						</div>
						<div>
							<span className="addr-mgr-item-market">
								批发市场 - {this.props.addr.market}
							</span>
							<span>&nbsp;&nbsp;</span>
							<span className="addr-mgr-item-stall">
								档口号 - {this.props.addr.stalls}
							</span>
						</div>
					</div>
				</Link>
				<div className="addr-mgr-item-footer">
					{
						this.props.addr.isDefault ?
						<div className="addr-mgr-item-default">
							<span className="addr-mgr-item-default-icon" />
							默认地址
						</div>
						:
						<div className="addr-mgr-item-undefault" onClick={this._change.bind(this, this.props.addr.deliveraddrId)}>
							<span className="addr-mgr-item-undefault-icon" />
							设为默认地址
						</div>
					}
					
					<button type="button" className="addr-mgr-item-delete" onClick={this._delete.bind(this, this.props.addr.deliveraddrId)}>
						<span className="addr-mgr-item-delete-icon" />
						删除
					</button>
				</div>
				
			</div>
			);
	},

	_change: function(aid) {
		this.props.onSetDefault(aid);
	},

	_delete: function(aid) {
		if (this.props.addr.isDefault) {
			alert('不能删除默认的地址');
			return;
		}
		if (confirm('确认删除？')) {
			this.props.onDelete(aid);
		}
	}
});

var NoAddress = React.createClass({
	render: function() {
		return (
			<div className="addr-mgr-no">
				<img src="./images/no_address.png" width="65" />
				<p>没有收获地址</p>
			</div>
			);
	}
});

var AddressMgr = React.createClass({
	statics: {
		loadProps: function(params, cb) {
			AddressMgrUtil.getData(function(res) {
				cb(null, {
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
			list: this.props.list
		};
	},

	render: function() {

		var items = this.state.list.map(function(item, index) {
			return (
				<AddrMgrItem addr={item} key={index} onSetDefault={this._setDefaultAddr} onDelete={this._deleteAddr}/>
				);
		}, this);

		return (
			<div className="row">
				<div className="col-xs-12 trim-col">
					<div className="addr-mgr">
						{items.length > 0 ? items : <NoAddress />}

						<div className="addr-mgr-btns">
							<Link to="/editaddress" className="addr-mgr-btn">
								<span className="glyphicon glyphicon-plus"/>
								&nbsp;
								新增地址
							</Link>
						</div>
					</div>
				</div>
			</div>
			);
	},

	_setDefaultAddr: function(aid) {
		AddressMgrUtil.setDefaultAddr(aid, function(res) {
			if (res.isSuccess) {
				AddressMgrUtil.getData(function(res) {
					this.setState({
						list: res.list
					});
				}.bind(this));
			}
			else {
				alert(res.reason);
			}
		}.bind(this));
	},

	_deleteAddr: function(aid) {
		AddressMgrUtil.delAddr(aid, function(res) {
			if (res.isSuccess) {
				AddressMgrUtil.getData(function(res) {
					this.setState({
						list: res.list
					});
				}.bind(this));
			}
			else {
				alert(res.reason);
			}
		}.bind(this));
	}
});

module.exports = AddressMgr;