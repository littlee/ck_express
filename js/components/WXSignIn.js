var React = require('react');
var fto = require('form_to_object');
var WXUtil = require('../utils/WXUtil.js');
var A = require('../A.js');

var ErrorMessage = require('./ErrorMessage.js');

var errMap = {
	'empty_phone': '请填写手机号码',
	'wrong_phone': '手机号码无效',
	'empty_code': '请填写验证码',
	'wrong_code': '验证码错误'
};

var WXSignIn = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			bindPhone: false,
			error: '',
			time: 60,
			waiting: false,
			sent: false
		};
	},

	componentDidMount: function() {
		var c = this.props.location.query.code;
		WXUtil.callback(c, function(res) {
			if (res.result === 'success') {
				A.setJWT(res.token);
				if (localStorage.getItem('wx_path_state') !== null) {
					this.context.router.replace(localStorage.getItem('wx_path_state'));
					localStorage.removeItem('wx_path_state');
					return;
				}
				this.context.router.replace('/orderlist');
			}
			else if (res.result === 'firstLoginSuccess') {
				this.setState({
					bindPhone: true
				});
			}
			else {
				alert(res.result);
			}
			
		}.bind(this));

	},

	componentWillUnmount: function() {
		this._clearTick();
	},

	render: function() {
		return (
			<div className="row">
				<div className="col-xs-12">
					{
						this.state.bindPhone ?
						<form onSubmit={this._submit}>
							<div className="alert alert-success">
								这是您第一次使用微信登录柯咔物流，请绑定您的手机号码
							</div>
							<div className="form-group">
								<label>
									手机号：
								</label>
								<input type="tel" name="phone" ref="phone" className="form-control"/>
							</div>
							<div className="form-group">
								<label>
									验证码：
								</label>
								<div className="input-group">
									<input type="tel" name="verificationCode" className="form-control" />
									<span className="input-group-btn">
										<button type="button" className="btn btn-default" disabled={ this.state.waiting } onClick={ this._getCode }>
											{ '获取验证码' + (this.state.waiting ? '(' + this.state.time + ')' : '') }
										</button>
									</span>
								</div>
							</div>
							<ErrorMessage error={this.state.error} />
							<div className="form-group">
								<button type="submit" className="btn btn-success btn-block">
									提交
								</button>
							</div>
						</form>
						:
						<h1 className="text-center">处理中，请稍候...</h1>
					}
				</div>
			</div>
			);
	},

	_getCode: function() {
		var p = this.refs.phone.value;
		this.setState({
			error: ''
		});
		if (p.trim() === '') {
			this.setState({
				error: errMap['empty_phone']
			});
			return;
		}

		if (!/^1[\d]{10}$/.test(p)) {
			this.setState({
				error: errMap['wrong_phone']
			});
			return;
		}

		this.setState({
			waiting: true
		});

		WXUtil.getCode(p, function(res) {
			if (res) {
				this._startTick();
			}
		}.bind(this));
	},

	_startTick: function() {
		this.tick = setInterval(function() {
			if (this.state.time > 0) {
				this.setState({
					time: --this.state.time
				});
				return;
			}

			this._clearTick();
			this.setState({
				time: 60,
				waiting: false
			});
		}.bind(this), 1000);
	},

	_clearTick: function() {
		clearInterval(this.tick);
	},

	_submit: function(e) {
		e.preventDefault();
		var data = fto(e.target);

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

		if (!data.verificationCode) {
			this.setState({
				error: errMap['empty_code']
			});
			return false;
		}

		if (!/^[\d]{6}$/.test(data.verificationCode)) {
			this.setState({
				error: errMap['wrong_code']
			});
			return false;
		}

		WXUtil.bindPhone(data, function(res) {
			if (res.token) {
				A.setJWT(res.token);
				if (localStorage.getItem('wx_path_state') !== null) {
					this.context.router.replace(localStorage.getItem('wx_path_state'));
					localStorage.removeItem('wx_path_state');
					return;
				}
				this.context.router.replace('/');
				return;
			}

			this.setState({
				error: errMap['wrong_code']
			});
		}.bind(this));
	}
});

module.exports = WXSignIn;