require('../../less/sign-in.less');

var React = require('react');
var fto = require('form_to_object');

var SignInUtil = require('../utils/SignInUtil.js');

var ErrorMessage = require('../components/ErrorMessage.js');

var SignIn = React.createClass({

	getInitialState: function() {
		return {			
			error: '',
			time: 60,
			waiting: false,
			sent: false
		};
	},

	render: function() {
		return (
			<div className="row">
				<div className="col-xs-12">
					<div className="sign-in">
						<form className="form-horizontal" onSubmit={this._submit}>
							<div className="form-group">
								<label className="control-label col-xs-3 trim-right">
									手机号：
								</label>
								<div className="col-xs-9 trim-left">
									<input type="tel" name="account" className="form-control"/>
								</div>
							</div>
							<div className="form-group">
								<label className="control-label col-xs-3 trim-right">
									验证码：
								</label>
								<div className="col-xs-9 trim-left">
									<div className="input-group sign-in-code">
										<input type="tel" name="code" className="form-control" />
										<span className="input-group-btn">
											<button className="btn btn-primary" type="button" disabled={this.state.waiting}>获取验证码</button>
										</span>
									</div>
								</div>
							</div>

							<ErrorMessage error={this.state.error}/>

							<div className="sign-in-btns">
								<button type="submit" className="btn btn-primary btn-block sign-in-btn">
									登录
								</button>
								<a href="#" className="btn btn-success btn-block sign-in-btn">
									微信登录
								</a>
							</div>

						</form>
					</div>
				</div>
			</div>
			);
	},

	_submit: function(e) {
		e.preventDefault();
		var data = fto(e.target);
		console.log(data);
		return false;
	}
});

module.exports = SignIn;