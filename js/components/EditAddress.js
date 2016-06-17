require('../../less/edit-address.less');

var React = require('react');
var fto = require('form_to_object');
var AddressMgrUtil = require('../utils/AddressMgrUtil.js');

var ErrorMessage = require('./ErrorMessage.js');

var errMap = {
	'empty_name': '请输入联系人姓名',
	'empty_phone': '请输入联系电话',
	'wrong_phone': '联系电话无效',
	'empty_market': '请输入所在批发市场',
	'empty_stalls': '请输入档口号'
};

var EditAddress = React.createClass({
	statics: {
		loadProps: function(params, cb) {
			if (params.params.aid) {
				AddressMgrUtil.getAddrById(params.params.aid, function(res) {
					cb(null, {
						name: res.name,
						phone: res.phone,
						market: res.market,
						stalls: res.stalls
					});
				});
			}
			else {
				cb(null, {
					name: '',
					phone: '',
					market: '',
					stalls: ''
				});
			}
		}
	},

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			error: '',
			name: this.props.name,
			phone: this.props.phone,
			market: this.props.market,
			stalls: this.props.stalls
		};
	},

	render: function() {

		return (
			<div className="row">
				<div className="col-xs-12 trim-col">
					<div className="edit-addr">
						<form className="form-horizontal" onSubmit={this._submit}>
							<div className="form-group">
								<label className="control-label col-xs-3">
									联系人
								</label>
								<div className="col-xs-9 trim-left">
									<input type="text" name="name" value={this.state.name} onChange={this._type.bind(this, 'name')} className="form-control" placeholder="请输入联系人姓名" maxLength="10"/>
								</div>
							</div>
							<div className="form-group">
								<label className="control-label col-xs-3">
									联系电话
								</label>
								<div className="col-xs-9 trim-left">
									<input type="tel" name="phone" value={this.state.phone} onChange={this._type.bind(this, 'phone')} className="form-control" placeholder="请输入联系人电话"/>
								</div>
							</div>
							<div className="form-group">
								<label className="control-label col-xs-3">
									批发市场
								</label>
								<div className="col-xs-9 trim-left">
									<input type="text" name="market" value={this.state.market} onChange={this._type.bind(this, 'market')} className="form-control" placeholder="请输入所在批发市场" maxLength="32"/>
								</div>
							</div>
							<div className="form-group">
								<label className="control-label col-xs-3">
									档口号
								</label>
								<div className="col-xs-9 trim-left">
									<input type="text" name="stalls" value={this.state.stalls} onChange={this._type.bind(this, 'stalls')} className="form-control" placeholder="请输入档口号" maxLength="32"/>
								</div>
							</div>

							<ErrorMessage error={this.state.error} />

							<div className="edit-addr-btn-wrap">
								<button type="submit" className="btn btn-primary edit-addr-btn">
									完成
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			);
	},

	_type: function(key, e) {
		var nState = this.state;
		nState[key] = e.target.value;
		this.setState(nState);
	},

	_submit: function(e) {
		e.preventDefault();
		var data = fto(e.target);

		if (!data.name) {
			this.setState({
				error: errMap['empty_name']
			});
			return false;
		}

		if (!data.phone) {
			this.setState({
				error: errMap['empty_phone']
			});
			return false;
		}

		if (!/^1[\d]{10}$/.test(data.phone)) {
			this.setState({
				error: errMap['wrong_phone']
			});
			return false;
		}

		if (!data.market) {
			this.setState({
				error: errMap['empty_market']
			});
			return false;
		}

		if (!data.stalls) {
			this.setState({
				error: errMap['empty_stalls']
			});
			return false;
		}

		if (this.props.params.aid) {
			data.deliveraddrId = this.props.params.aid;
			AddressMgrUtil.updateAddr(data, function(res) {
				if (res.isSuccess) {
					alert('保存成功');
					if (sessionStorage.getItem('edit_addr_next_path') !== null) {
						this.context.router.replace(sessionStorage.getItem('edit_addr_next_path'));
						return;
					}
					this.context.router.replace('/addressmgr');
				}
				else {
					alert(res.reason);
				}
			}.bind(this));
		}
		else {
			AddressMgrUtil.addAddr(data, function(res) {
				if (res.isSuccess) {
					alert('新增地址成功');
					if (sessionStorage.getItem('edit_addr_next_path') !== null) {
						this.context.router.replace(sessionStorage.getItem('edit_addr_next_path'));
						return;
					}
					this.context.router.replace('/addressmgr');
				}
				else {
					alert(res.reason);
				}
			}.bind(this));
		}
	}
});

module.exports = EditAddress;