require('../../less/address-list.less');

var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var AddressListUtil = require('../utils/AddressListUtil.js');

var AddrListItem = React.createClass({
	render: function() {
		return (
			<div className="addr-list-item">
				<label className="addr-list-item-label">
					<div className="addr-list-item-logo">
						<div className="addr-list-item-thumb">
							{this.props.addr.market}
						</div>
					</div>
					<div className="addr-list-item-info">
						<div>
							<span className="addr-list-item-name">
								{this.props.addr.name}
							</span>
							<span className="addr-list-item-phone">
								{this.props.addr.phone}
							</span>
						</div>
						<div>
							<span className="addr-list-item-market">
								批发市场 - {this.props.addr.market}
							</span>
							<span>&nbsp;&nbsp;</span>
							<span className="addr-list-item-stall">
								档口号 - {this.props.addr.stalls}
							</span>
						</div>
					</div>
					<input type="radio" name="a" value={this.props.addr.deliveraddrId} checked={this.props.addr.deliveraddrId + '' === this.props.selectedAddr + ''} onChange={this._change}/>
					<span className="addr-list-item-mark" />
				</label>
				<div className="addr-list-item-footer">
					{
						this.props.addr.isDefault ?
						<div className="addr-list-item-default">
							<span className="addr-list-item-default-icon" />
							默认地址
						</div> : null
					}
					
					<button type="button" className="addr-list-item-delete" onClick={this._delete.bind(this, this.props.addr.deliveraddrId)}>
						<span className="addr-list-item-delete-icon" />
						删除
					</button>
				</div>
				
			</div>
			);
	},

	_change: function(e) {
		this.props.onChange(e.target.value);
	},

	_delete: function(aid) {
		if (this.props.addr.isDefault) {
			alert('无法删除默认的地址');
			return;
		}
		if (aid + '' === this.props.selectedAddr + '') {
			alert('无法删除已经选择的地址');
			return;
		}

		if (confirm('确认删除？')) {
			AddressListUtil.delAddr(aid, function(res) {
				if (res.isSuccess) {
					AddressListUtil.listAddr(function(res) {
						var data = {
							list: res.undefault
						};
						if (res.default !== null) {
							data.list.unshift(res.default);
						}

						this.props.onDelete(data);
					}.bind(this));
				}
				else {
					alert(res.reason);
				}
			}.bind(this));
		}
	}
});

var AddressList = React.createClass({
	statics: {
		loadProps: function(params, cb) {

			AddressListUtil.listAddr(function(res) {
				var raw = res;
				var data = {
					list: raw.undefault
				};
				if (raw.default !== null) {
					data.list.unshift(raw.default);
				}
				cb(null, data);
			});
		}
	},

	getInitialState: function() {
		return {
			selectedAddr: sessionStorage.getItem('addr_list_select'),
			list: this.props.list
		};
	},

	render: function() {
		var addrItems = this.state.list.map(function(item, index) {
			return (
				<AddrListItem key={index} selectedAddr={this.state.selectedAddr} addr={item} onChange={this._changeAddr} onDelete={this._onDelete}/>
				);
		}, this);

		return (
			<div className="row">
				<div className="col-xs-12 trim-col">
					<div className="addr-list">
						{addrItems}

						<div className="addr-list-btns">
							<button type="button" className="addr-list-btn" onClick={this._addAddr}>
								<span className="glyphicon glyphicon-plus"/>
								&nbsp;
								新增地址
							</button>
							<button type="button" className="addr-list-btn" onClick={this._confirmAddr}>
								确定
							</button>
							<Link to="/ship" className="addr-list-btn addr-list-btn-back">
								返回
							</Link>
						</div>
					</div>
				</div>
			</div>
			);
	},

	_changeAddr: function(addr) {
		this.setState({
			selectedAddr: addr
		});
	},

	_addAddr: function() {
		sessionStorage.setItem('edit_addr_next_path', window.location.pathname);
		browserHistory.push({
			pathname: '/editaddress'
		});
	},

	_confirmAddr: function() {
		sessionStorage.setItem('addr_list_select', this.state.selectedAddr);
		browserHistory.replace({
			pathname: '/ship'
		});
	},

	_onDelete: function(data) {
		this.setState(data);
	}
});

module.exports = AddressList;