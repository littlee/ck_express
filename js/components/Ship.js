require('../../less/ship.less');

var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Modal = require('react-modal');
var fto = require('form_to_object');
var ShipUtil = require('../utils/ShipUtil.js');

var ErrorMessage = require('./ErrorMessage.js');

var ShipAddNewAddr = React.createClass({
	render: function() {
		return (
			<div className="ship-add-new-addr" onClick={this._addAddr}>
				<span className="glyphicon glyphicon-plus" />
				新增收货地址
			</div>
		);
	},

	_addAddr: function() {
		sessionStorage.setItem('edit_addr_next_path', window.location.pathname);
		browserHistory.push({
			pathname: '/editaddress'
		});
	}
});

var ShipSelAddr = React.createClass({
	render: function() {
		return (
			<div className="ship-sel-addr" onClick={this._chooseAddr}>
				<input type="hidden" name="addrId" value={this.props.addr.deliveraddrId} />
				<div className="ship-sel-addr-logo">
					<div className="ship-sel-addr-thumb">
						{this.props.addr.market}
					</div>
				</div>
				<div className="ship-sel-addr-info">
					<div className="ship-sel-addr-title">
						收货信息
					</div>
					<div>
						<span className="ship-sel-addr-name">
							{this.props.addr.name}
						</span>
						<span className="ship-sel-addr-phone">
							{this.props.addr.phone}
						</span>
						<button type="button" className="ship-sel-addr-edit" onClick={this._editAddr}>
							<span className="glyphicon glyphicon-pencil"/>
						</button>
					</div>
					<div>
						<span className="ship-sel-addr-market">
							批发市场 - {this.props.addr.market}
						</span>
						<span>&nbsp;&nbsp;</span>
						<span className="ship-sel-addr-stall">
							档口号 - {this.props.addr.stalls}
						</span>
					</div>
					<span className="glyphicon glyphicon-menu-right ship-sel-addr-arrow"/>
				</div>
			</div>
			);
	},

	_chooseAddr: function() {
		sessionStorage.setItem('addr_list_select', this.props.addr.deliveraddrId);
		browserHistory.push({
			pathname: '/addresslist'
		});
	},

	_editAddr: function(e) {
		e.stopPropagation();
		sessionStorage.setItem('edit_addr_next_path', window.location.pathname);
		browserHistory.push({
			pathname: '/editaddress/' + this.props.addr.deliveraddrId
		});
	}
});

var Ship = React.createClass({
	statics: {
		loadProps: function(params, cb) {
			ShipUtil.getAddress(function(addr) {
				ShipUtil.getLogistic(null, function(logi) {
					ShipUtil.getFreightCenter(function(fc) {

						var list = addr.undefault;
						if (addr.default) {
							list.unshift(addr.default);
						}

						cb(null, {
							list: list,
							addr: addr.default,
							logi: logi,
							fc: fc
						});
					});
				});
			});
		}
	},

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			showOther: false,
			openModal: false,
			error: '',
			addr: this.props.addr,
			logi: this.props.logi,
			fc: this.props.fc,
			companyId: this.props.logi.logisticCompanies[0].companyId,
			companyName: this.props.logi.logisticCompanies[0].name
		};
	},

	componentDidMount: function() {
		var selAddr = sessionStorage.getItem('addr_list_select');
		if (selAddr !== null) {
			this.props.list.every(function(item) {
				if (item.deliveraddrId + '' === selAddr + '') {
					this.setState({
						addr: item
					});
					return false;
				}
				return true;
			}, this);
		}
	},

	render: function() {

		var modalStyle = {
			overlay: {
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: 'rgba(0, 0, 0, 0.5)'
			},
			content: {
				position: 'absolute',
				top: '20px',
				left: '20px',
				right: '20px',
				bottom: 'auto',
				border: 'none',
				background: '#fff',
				overflow: 'auto',
				WebkitOverflowScrolling: 'touch',
				borderRadius: '0px',
				outline: 'none',
				padding: '10px'
			}
		};

		var logiItems = this.state.logi.logisticCompanies.map(function(item, index) {
			return (
				<div className="ship-select-item" key={index}>
					<label className="ship-select-item-label">
						<input type="radio" name="companyId" value={item.companyId} onChange={this._changeCompany.bind(this, item.companyId, item.name)} checked={item.companyId === this.state.companyId}/>
						<span className="ship-select-item-icon"/>
					</label>
					<div className="ship-select-item-wrap" onClick={this._viewLogiDetail.bind(this, item.logisticCompanyProfile)}>
						<div className="ship-select-item-logo">
							<div className="ship-select-item-thumb">
								<span>{item.name.slice(0, 1)}</span>
							</div>
						</div>
						<div className="ship-select-item-info">
							<div className="ship-select-item-name">
								{item.name}
							</div>
							<div className="ship-select-item-serve">
								{item.logisticCompanyProfile && item.logisticCompanyProfile.deliverScope}
							</div>
						</div>
					</div>
				</div>
				);
		}, this);

		var fcItems = this.state.fc.map(function(item, index) {
			return (
				<div className="ship-other-item" onClick={this._selectOther.bind(this, item.centerId)} key={index}>
					{item.name}
				</div>
				);
		}, this);

		return (
			<div className="row">
				<div className="col-xs-12 trim-col">
					<div className="ship">
						<form onSubmit={this._submit}>
							
							{
								this.state.addr ?
								<ShipSelAddr addr={this.state.addr}/> : <ShipAddNewAddr />
							}

							<div className="ship-select">
								<div className="ship-select-title">
									<input type="hidden" name="centerId" value={this.state.logi.center.centerId}/>
									{this.state.logi.center.name}
								</div>
								<div className="ship-select-items">
									{logiItems}
								</div>
							</div>

							<div className="ship-other">
								<p className="ship-other-tips">没有想要的物流？去看看</p>
								<button type="button" className="ship-other-btn" onClick={this._showOther}>
									其他物流中心
								</button>

								{
									this.state.showOther ?
									<div className="ship-other-items">
										{fcItems}
									</div> : null
								}
								
							</div>

							<ErrorMessage error={this.state.error}/>

							<div className="ship-btn-wrap">
								<button type="submit" className="btn btn-primary ship-btn">
									提交
								</button>
							</div>
						</form>
					</div>
				</div>

				<Modal
					isOpen={this.state.openModal}
					onRequestClose={this._closeModal}
					style={modalStyle} >
					<div className="ship-modal-header">
						<h5 className="ship-modal-title">请确认该订单已发货</h5>
					</div>
					<div className="ship-modal-body">
						<div className="ship-modal-block">
							<div className="ship-modal-block-title">
								揽货地址
							</div>
							<div className="ship-modal-block-info">
								<p>联系人：{this.state.addr && this.state.addr.name}</p>
								<p>联系电话：{this.state.addr && this.state.addr.phone}</p>
								<p>批发市场：{this.state.addr && this.state.addr.market}</p>
								<p>档口号：{this.state.addr && this.state.addr.stalls}</p>
							</div>
						</div>

						<div className="ship-modal-block">
							<div className="ship-modal-block-title">
								货运中心
							</div>
							<div className="ship-modal-block-info">
								<p>{this.state.logi.center.name}</p>
							</div>
						</div>

						<div className="ship-modal-block">
							<div className="ship-modal-block-title">
								物流公司
							</div>
							<div className="ship-modal-block-info">
								<p>{this.state.companyName}</p>
							</div>
						</div>
					</div>
					<div className="ship-modal-footer">
						<button type="button" className="btn btn-primary" onClick={this._confirmSubmit.bind(this, {
							centerId: this.state.logi.center.centerId,
							addrId: this.state.addr && this.state.addr.deliveraddrId,
							companyId: this.state.companyId
						})}>
							确认
						</button>
					</div>
				</Modal>
			</div>
			);
	},

	_showOther: function() {
		this.setState({
			showOther: true
		});
	},

	_selectOther: function(centerId) {
		this.setState({
			showOther: false
		});
		ShipUtil.getLogistic({
			centerId: centerId
		}, function(res) {
			this.setState({
				logi: res
			});
		}.bind(this));
	},

	_openModal: function() {
		this.setState({
			openModal: true
		});
	},

	_closeModal: function() {
		this.setState({
			openModal: false
		});
	},

	_viewLogiDetail: function(logi) {
		if (!logi) {
			alert('此物流公司无详情');
			return;
		}
		logi.center = this.state.logi.center.name;
		sessionStorage.setItem('logi_detail', JSON.stringify(logi));
		browserHistory.push({
			pathname: '/logidetail'
		});
	},

	_changeCompany: function(companyId, companyName) {
		this.setState({
			companyId: companyId,
			companyName: companyName,
			error: ''
		});
	},

	_submit: function(e) {
		e.preventDefault();
		var data = fto(e.target);

		if (!data.companyId) {
			this.setState({
				error: '请选择物流公司'
			});
			return false;
		}

		this.setState({
			error: ''
		});

		this._openModal();
		return false;
	},

	_confirmSubmit: function(data) {
		var fd = new FormData();
		Object.keys(data).forEach(function(key) {
			fd.append(key, data[key]);
		});

		ShipUtil.submit(fd, function(res) {
			if (res.isSuccess) {
				this.context.router.push('/shipsuccess?osn=' + res.orderSerialNum);
			}
		}.bind(this));
	}
});

module.exports = Ship;