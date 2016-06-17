require('../../less/sign-in.less');

var React = require('react');
var fto = require('form_to_object');

var A = require('../A.js');
var SignInUtil = require('../utils/SignInUtil.js');

var ErrorMessage = require('./ErrorMessage.js');

var errMap = {
	'empty_phone': '请填写手机号码',
	'wrong_phone': '手机号码无效',
	'empty_code': '请填写验证码',
	'wrong_code': '验证码错误'
};

var SignIn = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			error: '',
			time: 60,
			waiting: false,
			sent: false
		};
	},

	componentDidMount: function() {
		var nClass = document.body.className + ' sign-in-body';
		document.body.className = nClass.trim();
	},

	componentWillUnmount: function() {
		document.body.className = document.body.className.replace(/(?:^|\s)sign-in-body(?!\S)/g, '');
		this._clearTick();
	},

	render: function() {
		return (
			<div className="row">
				<div className="col-xs-12 trim-col">
					<div className="sign-in">
						<form className="form-horizontal" onSubmit={ this._submit }>
							<div className="sign-in-inner">
								<div className="sign-in-logo">
									<img src="./images/logo.png" width="100" />
								</div>
								<div className="form-group">
									<div className="input-group">
										<span className="input-group-addon">手机号：</span>
										<input type="tel" name="phone" className="form-control" ref="phone" />
									</div>
								</div>
								<div className="form-group sign-in-code">
									<div className="col-xs-7 trim-col">
										<div className="input-group">
											<span className="input-group-addon">验证码：</span>
											<input type="tel" name="verificationCode" className="form-control" />
										</div>
									</div>
									<div className="col-xs-5 trim-col sign-in-code-get">
										<button className="btn btn-default btn-block" type="button" disabled={ this.state.waiting } onClick={ this._getCode }>
											{ '获取验证码' + (this.state.waiting ? '(' + this.state.time + ')' : '') }
										</button>
									</div>
								</div>
							</div>
							<ErrorMessage error={ this.state.error } />
							<div className="sign-in-btns">
								<button type="submit" className="btn btn-primary btn-block sign-in-btn">
									登录
								</button>
								<a href="/cooka-user-web/weiXinLogin" className="btn btn-success btn-block sign-in-btn">
									微信登录
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
			);
	},

	_getCode: function() {
		var p = this.refs.phone.value;
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

		SignInUtil.getCode(p, function(res) {
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

		SignInUtil.signIn(data, function(res) {
			var loc = this.props.location;
			if (res.token) {
				A.setJWT(res.token);
				A.setUser(data.phone);
				if (loc.state && loc.state.nextPathname) {
					this.context.router.replace(loc.state.nextPathname);
				} else if (sessionStorage.getItem('uc_path_state') !== null) {
					this.context.router.replace(sessionStorage.getItem('uc_path_state'));
					sessionStorage.removeItem('uc_path_state');
				} else {
					this.context.router.replace('/orderlist');
				}
				return;
			}

			this.setState({
				error: errMap[res.reason]
			});

		}.bind(this));

		return false;
	}
});

module.exports = SignIn;